const cp = require('child_process');

// mass output file
//const outputFileName = './../outputs/library.js';

// inputs
export const csvInput = ['./../inputs/Worm_Features.txt', './../inputs/Yeast_Features.txt'];
const genbankInput = './../inputs/Geneious_Features.gb'; // FALSE on USE_ANNOTATIONS
 // or "/../inputs/SnapGeneLibrary.gb" -> TRUE on USE_ANNOTATIONS

// parsing processors
const genbankParse = './genbank_parser.py';
const csvParse = require('./csv_parser.js');

const dualParse = function () {
  csvParse.run(csvInput)
  .then(() => {
    cp.exec(`python ${genbankParse} ${genbankInput} false`);
    console.log('Successfully parsed – library created at \'./../outputs/library.js\'');
  });
};

dualParse();
