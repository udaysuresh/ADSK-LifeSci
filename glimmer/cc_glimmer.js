const fetch = require("isomorphic-fetch")

/**
 * Sends the code and corresponding gslc options to run the command on the server.
 * @param {string} code current Code
 * @param {Object} args argument object
 * @param {string} projectId
 * @return {string} resultData
 */
const run = (code, args, projectId) => {
  //const extension = require('config.name');

  const script = `
#!/usr/bin/env bash
mkdir /outputs
/glimmer3.02/bin/long-orfs /glimmer3.02/sample-run/tpall.fna -n -t 1.15 /outputs/cc_output`;

  const payload = {
    CreateContainerOptions: {
      Image: 'docker.io/udaysuresh/glimmer:latest',
      Cmd: ['/bin/sh', '/inputs/script.sh'],
      EntryPoint: [],
    },
    inputs: {
      'script.sh': script,
      'sequence': code, // using built in fasta for testing
    },
    parameters: {
      maxDuration: 12000,
    },
    meta: {
      projectId: projectId, // Unnecessary, but could be useful for logging
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
    .catch((err) => {
      console.error('Request timed out:', err);
      return {
        'result': 'Unable to process the request:' + err,
        'status': 1,
        'contents': [],
      };
    });
};

exports.run = run
if (process.env.RUN) {
  run('>rubbish\natatatagagagcgcgagagag\n', null, 'project-987bad91-cdbb-4e69-ab4b-1091222f4864');
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
