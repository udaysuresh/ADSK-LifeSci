const cp = require('child_process');

// mass output file
//const outputFileName = './../outputs/library.js';

// inputs
const csvInput = ['./../inputs/Worm_Features.txt', './../inputs/Yeast_Features.txt', './../inputs/gateway_features.txt'];
                  // './../inputs/Default_Features.txt'
const geneiousInput = './../inputs/Geneious_Features.gb'; // FALSE on USE_ANNOTATIONS
const snapGeneInput = './../inputs/SnapGeneLibrary.gb'; // TRUE on USE_ANNOTATIONS
const plasmids = ['./../clean_gb/plasmid_1.gb', './../clean_gb/plasmid_2.gb', './../clean_gb/plasmid_3.gb', './../clean_gb/plasmid_4.gb', './../clean_gb/plasmid_5.gb']; // FALSE on USE_ANNOTATIONS

 // or "/../inputs/SnapGeneLibrary.gb" -> TRUE on USE_ANNOTATIONS

// parsing processors
const genbankParse = './genbank_parser.py';
const csvParse = require('./csv_parser.js');

const fullParse = function multiParse() {
  csvParse.run(csvInput)
    .then(() => {
      cp.execSync(`python genbank_parser.py ${snapGeneInput} True open none`);
      plasmids.forEach((plasmid) => {
        cp.execSync(`python genbank_parser.py ${plasmid} False open none`);
      });
      cp.execSync(`python genbank_parser.py ${geneiousInput} False close geneious-toggle`);
      console.log('Successfully parsed – library created at \'./../outputs/library.js\'');
    });
};

fullParse();

// cp.exec(`python ${genbankParse} ${snapGeneInput} True False False`);
// plasmids.forEach((plasmid) => {
//   cp.exec(`python ${genbankParse} ${plasmid} False False False`);
// });
// cp.exec(`python ${genbankParse} ${geneiousInput} False True True`);
// console.log('Successfully parsed – library created at \'./../outputs/library.js\'');
