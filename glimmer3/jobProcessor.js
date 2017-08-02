const fetch = require('isomorphic-fetch');
const Queue = require('bull');
const constructorClasses = require('constructor-classes');
const logger = require('./logger');

const orfParser = require('./pipeline/orf_parser');
const ccGlimmer = require('./cc_glimmer.js');

//DEBUG=constructor:jobs:* for lots of logs
logger('loaded glimmer3');

//queues are namespaced across instances / environments
const extensionName = 'glimmer3';
const queueName = `${process.env.JOB_PREFIX}${extensionName}`;
let queue;

try {
  queue = Queue(queueName, process.env.REDIS_PORT, process.env.REDIS_HOST, { //eslint-disable-line new-cap
    db: process.env.REDIS_DB || 1, // matches default in GC's urlConstants.js
  });
} catch (err) {
  logger('[glimmer3] could not start queue - is redis running?');
  throw err;
}
queue.process((job) => {
  try {
    logger('[glimmer job processor] got job', job.opts.jobId);

    //setup
    const { id, sequence } = job.data;

    if (!id || !sequence) {
      throw new Error('job.data.id and job.data.sequence required');
    }

    const fasta = `>${id}
${sequence.replace(/(\r\n|\n|\r)/gm, '')}
`;
    // JOB FLOW

    return ccGlimmer.run(fasta, job.opts.projectId)
    .then((outputs) => {
      logger(outputs['long-orfs']);
      return outputs['long-orfs'];
    })
    //process it to annotations etc. for constructor
    .then(outputs => orfParser.parseFile(outputs))
    .then(annotations => ({
      deltaSchema: 1,
      project: new constructorClasses.models.Project({ id: null }),
      annotations: { [id]: annotations },
    }))
    //write the result where the job result is expected to be
    .then(result => writeFile(job.opts.urlOutput, JSON.stringify(result, null, 2))
    .then(() => {
      logger('[glimmer3 job processor] resolving!', job.opts.jobId);
      //return value is rawresult but otherwise meaningless
      return true;
    }))
    .catch((err) => {
      logger('[glimmer3 promise-catch]', job.opts.jobId);
      logger(err);
      return Promise.reject(err);
    });
  } catch (err) {
    logger('[glimmer3 try-catch]', job.opts.jobId);
    logger.error(err);
    return Promise.reject(err);
  }
});

//utils

//hoisted
function writeFile(url, fileContent) {
  return fetch(url, { method: 'PUT', body: fileContent })
  .catch((err) => {
    console.log('[glimmer] writeFile error');
    logger(err);
    throw err;
  })
  .then((resp) => {
    if (resp.status >= 400 && process.env.NODE_ENV !== 'production') {
      return resp.clone().text()
      .then((txt) => {
        console.log('[glimmer] writeFile failure');
        logger(txt);
        return resp;
      });
    }

    return resp;
  });
}
