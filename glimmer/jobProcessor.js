const fetch = require('isomorphic-fetch');
const Queue = require('bull');
const uuid = require('uuid');
const fs = require('fs');
const cp = require('child_process');
const mkpath = require('mkpath');
const constructorClasses = require('constructor-classes');

const orf_parser = require('./pipeline/orf_parser');
const cc_glimmer = require('./cc_glimmer.js');


//DEBUG=constructor:jobs:* for lots of logs
console.log('loaded glimmer3');

//queues are namespaced across instances / environments
const extensionName = 'glimmer3';
const queueName = `${process.env.JOB_PREFIX}${extensionName}`;
let queue;

try {
  queue = Queue(queueName, process.env.REDIS_PORT, process.env.REDIS_HOST, { //eslint-disable-line new-cap
    db: process.env.REDIS_DB || 1, // matches default in GC's urlConstants.js
  });
} catch (err) {
  console.log('[glimmer3] could not start queue - is redis running?');
  throw err;
}

queue.process((job) => {
  try {
    console.log('[glimmer job processor] got job', job.opts.jobId);
    //console.log(job.opts);

    //setup
    const { id, sequence } = job.data;
    const fasta = `>${id}\n` + `${sequence.replace(/(\r\n|\n|\r)/gm, '')}`;

    const directory = uuid.v4(); //shared across constainer and local
    const localFolder = `${directory}`; //namespacing
    const inputFileName = 'input';
    const inputFileLocal = `${localFolder}/${inputFileName}`;
    const outFileName = 'output';
    const outFileLocal = `${localFolder}/${outFileName}`;


    // JOB FLOW


    //make directory
    // return new Promise((resolve, reject) => {
    //   mkpath(directory, (err) => {
    //     if (err) {
    //       return reject(errorFileSystem);
    //     }
    //     resolve(directory);
    //   });
    // })
    //write the input file
    // .then(() => new Promise((resolve, reject) => {
    //   console.log(inputFileLocal);
    //   fs.writeFile(inputFileLocal, fasta, 'utf8', (err, done) => {
    //     if (err) {
    //       return reject(err);
    //     }
    //     resolve(fasta);
    //   })
    // }))
    //run the docker executable
    //return new Promise((resolve, reject) => {
      //const input = '/glimmer3.02/sample-run/tpall.fna'; // glimmer-sample for testing
      // console.log('status:');
      // console.log(fasta);

      //TODO - this should be root /tmp folder
      //const dockerBash = `docker run -i -v $PWD/${directory}:/output -w /output glimmer /glimmer3.02/bin/long-orfs ${input} -n -t 1.15 ${outFileName}`;
      //const opts = {};

      //https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback

      // cp.exec(dockerBash, opts, (err, stdout, stderr) => {
      //   if (err) {
      //     return reject(err);
      //   }
      //   console.log(stdout);
      //   resolve(stdout);
      // })
    return cc_glimmer.run(fasta, job.opts.projectId)
      .then((outputs) => {
        console.log(outputs['long-orfs']);
        return outputs['long-orfs'];
      })
    //})
    //get the output files you care about
    // .then((outputs) => new Promise((resolve, reject) => {
    //   console.log(outputs);
    //   fs.readFile('middle', outputs, 'utf8', (err, contents) => {
    //     if (err) {
    //       return reject(err);
    //     }
    //     resolve(contents); //need to assign stdout to fasta
    //   })
    // }))
    //process it to annotations etc. for constructor
    .then(outputs => orf_parser.parseFile(outputs))
    .then(annotations => ({
      deltaSchema: 1,
      project: new constructorClasses.models.Project({ id: null }),
      annotations: { [id]: annotations },
    }))
    //.then(annotations => new constructorClasses.models.Delta({ annotations: { [id]: annotations } }))
    //write the result where the job result is expected to be
    .then(result => fetch(job.opts.urlOutput, { method: 'PUT', body: JSON.stringify(result, null, 2) })
      .then(() => {
        console.log('[glimmer3 job processor] resolving!', job.opts.jobId);
        //this is arbitrary but helpful for debugging
        //you can look at the /rawresult URL in the console
        //s3mock//tmp/.../rawresult will be this:
        return 'my data';
      }))
    .catch((err) => {
      console.log('[glimmer3 promise-catch]', job.opts.jobId);
      console.log(err);
      return Promise.reject(err);
    });
  } catch (err) {
    console.log('[glimmer3 try-catch]', job.opts.jobId);
    console.error(err);
    return Promise.reject(err);
  }
});

//utils

//hoisted
function writeFile(url, fileContent) {
  return fetch(url, { method: 'PUT', body: fileContent })
  .catch((err) => {
    console.log('fetch error');
    console.log(err);
    throw err;
  })
  .then((resp) => {
    if (resp.status >= 400 && process.env.NODE_ENV !== 'production') {
      return resp.clone().text()
      .then((txt) => {
        console.log('fetch failure');
        console.log(txt);
        return resp;
      });
    }

    return resp;
  });
}
