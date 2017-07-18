const fetch = require('isomorphic-fetch');
const Queue = require('bull');
const uuid = require('uuid');
const fs = require('fs');

const cp = require('child_process')

//DEBUG=constructor:jobs:* for lots of logs

//queues are namespaced across instances / environments
const extensionName = 'glimmer3'
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
    const fasta = `> ${id}
${sequence}`;

    const directory = uuid.v4();
    const folder = `/tmp/glimmer3/${directory}`;
    const inputFileName = `${folder}/input`;
    const outFileName = ``; //todo





    // JOB FLOW

    //write the input file
    return new Promise((resolve, reject) => {
      console.log(inputFileName);
      fs.writeFile(inputFileName, fasta, 'utf8', (err, done) => {
        if (err) {
          return reject(err);
        }
        resolve(fasta);
      })
    })
    //run the docker executable
    .then(() => new Promise((resolve, reject) => {
      // yikes, we need the dockerfile built and running to make this run autonomously
      const dockerBash = `docker exec $PWD/mydata:/glimmer_output -w /glimmer_output glimmer /glimmer3.02/bin/long-orfs tpall.fna -n -t 1.15 glimmer_output`;
      const opts = {};

      //https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback

      cp.exec(dockerBash, opts, (err, stdout, stderr) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      })
    }))
    //get the output files you care about
    .then(() => new Promise((resolve, reject) => {
      fs.readFile(outFileName, 'utf8', (err, done) => {
        if (err) {
          return reject(err);
        }
        resolve(fasta);
      })
    }))
    //process it to annotations etc. for constructor
    .then(() => new Promise((resolve, reject) => {
      //todo
    }))
    //write the result where the job result is expected to be
    .then(result => {
      return fetch(job.opts.urlOutput, { method: 'PUT', body: JSON.stringify(result, null, 2) })
      .then(() => {
        console.log('[glimmer3 job processor] resolving!', job.opts.jobId);
        //this is arbitrary but helpful for debugging
        //you can look at the /rawresult URL in the console
        //s3mock//tmp/.../rawresult will be this:
        return 'my data';
      })
    })
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
function writeFile (url, fileContent) {
  return fetch(url, { method: 'PUT', body: fileContent })
  .catch((err) => {
    console.log('fetch error');
    console.log(err);
    throw err;
  })
  .then((resp) => {
    logger(`[writeFile] ${resp.status} - ${url}`);

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
