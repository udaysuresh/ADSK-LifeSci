////////////////////////////////////////////////////////////////
// reads glimmer output text/csv files and then separates elements into array
// attempt to parse post spaced out line <--

const _ = require('lodash');
//const csvParse = require('csv-parse');
const fs = require('fs');

const fileName = 'output.js';

//only for csv files

// need to outwardly specify files
//const files = ['../exampleOutput/TEST'];
const COLUMNS = ['name', 'start', 'end', 'alignment', 'match', 'direction', 'computed'];

exports.orf_to_anno = function (files) {
  Promise.all(files.map(fileName => readFile(fileName).then(parseFile)))
  .then(dataArrays => _.flatten(_.concat(dataArrays)))
  .then((annotations) => {
    //console.log(annotations);
    const args = JSON.stringify(annotations, null, 2);
    fs.writeFileSync(fileName, args);
  });
};

/* helpers */

function readFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, text) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(text);
    });
  });
}

function parseFile(text) {
  return text.split('\n')
  .filter(line => !!line)
  .map(line => line.split(/\s+/g))
  .map(chunked => _.zipObject(COLUMNS, chunked))
  .map((obj) => {
    const start = parseInt(obj.start, 10);
    const end = parseInt(obj.end, 10);
    const rounded = Math.round(parseFloat(obj.match) * 100 * 10) / 10;
    const roundedMatch = Math.max(100, rounded);

    return {
      name: 'ORF',
      start: Math.min(start, end),
      end: Math.max(start, end),
      alignment: parseFloat(obj.alignment),
      direction: parseFloat(obj.alignment) > 0 ? 'forward' : 'reverse',
      match: roundedMatch,
      source: {
        source: 'glimmer3',
      },
    };
  });
}

exports.parseFile = parseFile;

