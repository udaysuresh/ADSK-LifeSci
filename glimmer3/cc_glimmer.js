const fetch = require('isomorphic-fetch');

/**
 * Sends the code and corresponding options to run the command on the server.
 * @param {string} fastaFile
 * @param {string} projectId
 * @return {string} resultData
 */
const run = (fastaFile, projectId) => {
  const fileName = 'fasta';

  const script = `
#!/usr/bin/env bash
mkdir /outputs
cat /inputs/${fileName}
/glimmer3.02/bin/long-orfs /inputs/${fileName} -n -t 1.15 /outputs/long-orfs`;

  const payload = {
    CreateContainerOptions: {
      Image: 'docker.io/udaysuresh/glimmer:latest',
      Cmd: ['/bin/sh', '/inputs/script.sh'],
      EntryPoint: [],
    },
    inputs: {
      'script.sh': script,
      [fileName]: fastaFile, // using built in fasta for testing
    },
    parameters: {
      maxDuration: 62000,
    },
    meta: {
      projectId, // Unnecessary, but could be useful for logging
    },
  };

  return fetch(`${process.env.HOST_URL}/compute/${projectId}`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(payload),
  })
  .then((resp) => {
    if (resp.status >= 400) {
      return Promise.reject(resp);
    }
    return resp;
  })
  .catch((err) => {
    console.error('[cc_glimmer] Request failed');
    console.error(err);
    throw new Error('CCC Failure');
  })
  .then(resp => resp.json())
  .then(json => json.result.outputs);
};

exports.run = run;
