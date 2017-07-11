////////////////////////////////////////////////////////////////
// reads text/csv files and then tries to separate elements into array
// attempt to parse post spaced out line <--

var _ = require('lodash');
var csvParse = require('csv-parse');
var fs = require('fs');

const fileName = 'output.js';

//only for csv files
const files = ['./Worm_Features.txt', './Yeast_Features.txt'];
const columns = ['name', 'sequence', 'type', 'color1'];

Promise.all(files.map(fileName => readFile(fileName).then(parseFile)))
.then(dataArrays => {
  return _.flatten(_.concat(dataArrays));
})
.then(flatListOfParts => {
  return _.reduce(flatListOfParts, (acc, row) => {
    const rowObj = _.zipObject(columns, row);
    acc.push(rowObj);
    return acc;
  }, []);
})
.then(annotations => {
  console.log(annotations);
  const a = JSON.stringify(annotations, null, 2);
  fs.writeFileSync(fileName, a)


  //make annotations + find ranges
});

/* helpers */

function readFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', function(err, text) {
      if (err) {
        reject(err);
        return;
      }

      resolve(text);
    });
  });
}

function parseFile(text) {
  return new Promise((resolve, reject) => {
    csvParse(text, {delimiter: '\t'}, function(err, data) {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
}



/////////////////////////////////////////////////////////////////

// just reads the file straight up
/*
fs = require('fs')
fs.readFile('./Worm_Features.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});
*/

////////////////////////////////////////////////////////////////

// reads the file with some error catching mechanism as well
/*
const fs = require('fs');

function read_seqs(file, cb) {
  fs.readFile(file, 'utf8', function(err, data) {
    if (!err) {
      cb(data.toString().split('\n'))
    } else {
      console.log('err')
    }
  });
}

process.argv[1]

read_seqs('/Worm_Features.txt', function(data) {
  var sequence_name = [];
  for(var name in data){
    sequence_name.push(+data[name].match(/\d+/g));
  }
  console.log(sequence_name)
});
*/
