const fetch = require('isomorphic-fetch');

/**
 * Sends the code and corresponding options to run the command on the server.
 * @param {string} code current Code
 * @param {Object} args argument object
 * @param {string} projectId
 * @return {string} resultData
 */
const run = (code, projectId) => {
  //const extension = require('config.name');

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
      [fileName]: code, // using built in fasta for testing
    },
    parameters: {
      maxDuration: 62000,
    },
    meta: {
      projectId, // Unnecessary, but could be useful for logging
    },
  };

  return fetch(`http://localhost:3000/compute/${projectId}`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(payload),
  })
    .then(resp => resp.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .then(json =>
      //CHeck exitCode, or other errors in json
       json.result.outputs)
    .catch((err) => {
      console.error('Request timed out:', err);
      return {
        result: `Unable to process the request:${err}`,
        status: 1,
        contents: [],
      };
    });
};

exports.run = run;
if (process.env.RUN) {
  run();
}

/*
curl -X POST \
  http://localhost:3001/compute/project-4d21e02b-dc87-40a7-9ffa-e5fb0245c697 \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: d830a4d7-749b-e875-6327-21009125ea5d' \
  -d '{
    "image": "docker.io/udaysuresh/glimmer:latest",
    "command": ["/bin/sh", "/inputs/script.sh"],
    "inputs": {
        "script.sh": "#!/bin/sh\necho '\''foobar'\''\necho '\''out123'\'' >> /dev/stderr\nmkdir -p /outputs\necho '\''bar345'\'' > /outputs/outputName1\ncat /inputs/input1 > /outputs/outputName2",
        "input1": ""
    },
    "parameters": {"maxDuration":30, "cpus":1}

}'
*/
