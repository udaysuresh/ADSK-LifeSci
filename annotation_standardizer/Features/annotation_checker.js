//assume that var annotations has been defined

// JS way
// array.filter(() => {})
// .reduce(() => {})
// .map(() => {})


// expose on the window
window.makeAnnotations = function makeAnnotations() {
  const start = +Date.now();
  const construct = window.constructor.api.focus.focusGetConstruct();
  const tree = window.constructor.api.projects.projectCreateProjectTree(construct.projectId);
  const blocks = tree.leaves(construct.id).map(node => node.data);

  Promise.all(blocks.map(block => block.getSequence()))
  .then(sequences => sequences.join(''))
  .then(sequence => {
    console.log(sequence);
    const seqNormalized = sequence.toLowerCase();

    function findAndReduce(accumulator, libraryObj) {
        var start = seqNormalized.indexOf(libraryObj.sequence.toLowerCase());
        if (start >= 0) {
          var myObject = {
            start: start,
            annotation: libraryObj
           };
          accumulator.push(myObject);
        }
        return accumulator;
    }

    function mapToAnnotation(myObject) {
      const { start, annotation } = myObject;

      const annotationMade = constructor.api.annotations.annotationAdd(construct.id, {
        start: start,
        end: start + annotation.sequence.length,
        name: annotation.name,
        description: annotation.description,
        direction: 'none',
      });

      return annotationMade;
    }

    //lodash way
    var found = _(annotations)
    .reduce(findAndReduce, [])
    .map(mapToAnnotation);

    console.log(found);
    //timing
    console.log(+Date.now() - start)
  })
};



//dummy stuff
var defaultSequence = "ATGAGTAAAGGAGAAGAACTTTTCACTGGAGTTGTCCCAATTCTTGTTGAATTAGATGGTGATGTTAATGGGCACAAATTTTCTGTCAGTGGAGAGGGTGAAGGTGATGCAACATACGGAAAACTTACCCTTAAATTTATTTGCACTACTGGAAAACTACCTGTTCCATGG+CCAACACTTGTCACTACTYTCTGTTATGGTGTTCAATGCTTCTCGAGATACCCAGATCATATGAAACRGCATGACTTTTTCAAGAGTGCCATGCCCGAAGGTTATGTACAGGAAAGAACTATATTTTTCAAAGATGACGGGAACTACAAGACAC+GTGCTGAAGTCAAGTTTGAAGGTGATACCCTTGTTAATAGAATCGAGTTAAAAGGTATTGATTTTAAAGAAGATGGAAACATTCTTGGACACAAATTGGAATACAACTATAACTCACACAATGTATACATCATGGCAGACAAACAAAAGAATGGAATCAAAGTT+AACTTCAAAATTAGACACAACATTGAAGATGGAAGCGTTCAACTAGCAGACCATTATCAACAAAATACTCCAATTGGCGATGGCCCTGTCCTTTTACCAGACAACCATTACCTGTCCACACAATCTGCCCTTTCGAAAGATCCCAACGAAAAGAGAGACCACATGGTCCTTCTTGAGTTTGTAACAGCTGCTGGGATTACACATGGCATGGAYGAACTATACAAAACGTACGTACGATCGATCGATGACTGCTCCAAAGAAGAAGCGTAAGGTACCGGTAGAAAAAATGAGTAAAGGAGAAGAACTTTTCACTGGAGTTGTCCCAATTCTTGTTGAATTAGATGGTGATGTTAATGGGCACAAATTTTCTGTCAGTGGAGAGGGTGAAGGTGATGCAACATACGGAAAACTTACCCTTAAATTTATTTGCACTACTGGAAAACTACCTGTTCCATGGgtaagtttaaacatatatatactaactaaccctgattatttaaattttcagCCAACACTTGTCACTACTYTCTGTTATGGTGTTCAATGCTTCTCGAGATACCCAGATCATATGAAACRGCATGACTTTTTCAAGAGTGCCATGCCCGAAGGTTATGTACAGGAAAGAACTATATTTTTCAAAGATGACGGGAACTACAAGACACgtaagtttaaacagttcggtactaactaaccatacatatttaaattttcagGTGCTGAAGTCAAGTTTGAAGGTGATACCCTTGTTAATAGAATCGAGTTAAAAGGTATTGATTTTAAAGAAGATGGAAACATTCTTGGACACAAATTGGAATACAACTATAACTCACACAATGTATACATCATGGCAGACAAACAAAAGAATGGAATCAAAGTTgtaagtttaaacatgattttactaactaactaatctgatttaaattttcagAACTTCAAAATTAGACACAACATTGAAGATGGAAGCGTTCAACTAGCAGACCATTATCAACAAAATACTCCAATTGGCGATGGCCCTGTCCTTTTACCAGACAACCATTACCTGTCCACACAATCTGCCCTTTCGAAAGATCCCAACGAAAAGAGAGACCACATGGTCCTTCTTGAGTTTGTAACAGCTGCTGGGATTACACATGGCATGGAYGAACTATACAAActtcaagatccgccacaacatcgaggacggcggcgtgcagctcgccgaccactaccagcagaacacccccatcggcgacggccccgtgctgctgcccgacaaccactacctgagcacccagtccaagctgagcaaagaccccaacgagaagcgcgatcacatggtcctgctggagttcgtgaccgccgccgggatcactctcggcatggacgagctgtacaagtaaatggtgagcaagggcgaggagctgttcaccggggtggtgcccatcctggtcgagctggacggcgacgtaaacggccacaagttcagcgtgtccggcgagggcgagggcgatgccacctacggcaagctgaccctgaagttcatctgcaccaccggcaagctgcccgtgccctggcccaccctcgtgaccaccctgtcctggggcgtgcagtgcttcgcccgctaccccgaccacatgaagcagcacgacttcttcaagtccgccatgcccgaaggctacgtccaggagcgcaccatcttcttcaaggacgacggcaactacaagacccgcgccgaggtgaagttcgagggcgacaccctggtgaaccgcatcgagctgaagggcatcgacttcaaggaggacggcaacatcctggggcacaagctggagtacaactacatcagcgacaacgtctatatcaccgccgacaagcagaagaacggcatcaaggccaacttcaagatccgccacaacatcgaggacggcggcgtgcagctcgccgaccactaccagcagaacacccccatcggcgacggccccgtgctgctgcccgacaaccactacctgagcacccagtccaagctgagcaaagaccccaacgagaagcgcgatcacatggtcctgctggagttcgtgaccgccgccgggatcactctcggcatggacgagctgtacaagtaaatggtgagcaagggcgaggagctgttcaccggggtggtgcccatcctggtcgagctggacggcgacgtaaacggccacaagttcagcgtgtccggcgagggcgagggcgatgccacctacggcaagctgaccctgaagttcatctgcaccaccggcaagctgcccgtgccctggcccaccctcgtgaccaccctgtcctggggcgtgcagtgcttcgcccgctaccccgaccacatgaagcagcacgacttcttcaagtccgccatgcccgaaggctacgtccaggagcgcaccatcttcttcaaggacgacggcaactacaagacccgcgccgaggtgaagttcgagggcgacaccctggtgaaccgcatcgagctgaagggcatcgacttcaaggaggacggcaacatcctggggcacaagctggagtacaactactttagcgacaacgtctatatcaccgccgacaagcagaagaacggcatcaaggccaacttcaagatccgccacaacatcgaggacggcggcgtgcagctcgccgaccactaccagcagaacacccccatcggcgacggccccgtgctgctgcccgacaaccactacctgagcacccagtccaagctgagcaaagaccccaacgagaagcgcgatcacatggtcctgctggagttcgtgaccgccgccgggatcactctcggcatggacgagctgtacaagtaaatggtgagcaagggcgaggagctgttcaccggggtggtgcccatcctggtcgagctggacggcgacgtaaacggccacaagttcagcgtgtccggcgagggcgagggcgatgccacctacggcaagctgaccctgaagctgatctgcaccaccggcaagctgcccgtgccctggcccaccctcgtgaccaccctgggctacggcctgcagtgcttcgcccgctaccccgaccacatgaagcagcacgacttcttcaagtccgccatgcccgaaggctacgtccaggagcgcaccatcttcttcaaggacgacggcaactacaagacccgcgccgaggtgaagttcgagggcgacaccctggtgaaccgcatcgagctgaagggcatcgacttcaaggaggacggcaacatcctggggcacaagctggagtacaactacaacagccacaacgtctatatcaccgccgacaagcagaagaacggcatcaaggccaacttcaagatccgccacaacatcgaggacggcggcgtgcagctcgccgaccactaccagcagaacacccccatcggcgacggccccgtgctgctgcccgacaaccactacctgagctaccagtccaagctgagcaaagaccccaacgagaagcgcgatcacatggtcctgctggagttcgtgaccgccgccgggatcactctcggcatggacgagctgtacaagtaaatggtgagcaagggcgaggagctgttcaccggggtggtgcccatcctggtcgagctggacggcgacgtaaacggccacaagttcagcgtgtccggcgagggcgagggcgatgccacctacggcaagctgaccctgaagttcatctgcaccaccggcaagctgcccgtgccctggcccaccctcgtgaccaccctgacctggggcgtgcagtgcttcgcccgctaccccgaccacatgaagcagcacgacttcttcaagtccgccatgcccgaaggctacgtccaggagcgcaccatcttcttcaaggacgacggcaactacaagacccgcgccgaggtgaagttcgagggcgacaccctggtgaaccgcatcgagctgaagggcatcgacttcaaggaggacggcaacatcctggggcacaagctggagtacaacgccatcagcgacaacgtctatatcaccgccgacaagcagaagaacggcatcaaggccaacttcaagatccgccacaacatcgaggacggcagcgtgcagctcgccgaccactaccagcagaacacccccatcggcgacggccccgtgctgctgcccgacaaccactacctgagcacccagtccaagctgagcaaagaccccaacgagaagcgcgatcacatggtcctgctggagttcgtgaccgccgccgggatcactctcggcatggacgagctgtacaagtaaatggtgagcaagggcgaggagaccacaatgggcgtaatcaagcccgacatgaagatcaagctgaagatggagggcaacgtgaatggccacgccttcgtgatcgagggcgagggcgagggcaagccctacgacggcaccaacaccatcaacctggaggtgaaggagggagcccccctgcccttctcctacgacattctgaccaccgcgttcgcctacggcaacagggccttcaccaagtaccccgacgacatccccaactacttcaagcagtccttccccgagggctactcttgggagcgcaccatgaccttcgaggacaagggcatcgtgaaggtgaagtccgacatctccatggaggaggactccttcatctacgagatacacctcaagggcgagaacttcccccccaacggccccgtgatgcagaagaagaccaccggctgggacgcctccaccgagaggatgtacgtgcgcgacggcgtgctgaagggcgacgtcaagcacaagctgctgctggagggcggcggccaccaccgcgttgacttcaagaccatctacagggccaagaaggcggtgaagctgcccgactatcactttgtggaccaccgcatcgagatcctgaaccacgacaaggactacaacaaggtgaccgtttacgagagcgccgtggcccgcaactccaccgacggcatggacgagctgtacaagtaaatggtgagcaagggcgaggagaccacaatgggcgtaatcaagcccgacatgaagatcaagctgaagatggagggcaacgtgaatggccacgccttcgtgatcgagggcgagggcgagggcaagccctacgacggcaccaacaccatcaacctggaggtgaaggagggagcccccctgcccttctcctacgacattctgaccaccgcgttcagttacggcaacagggccttcaccaagtaccccgacgacatccccaactacttcaagcagtccttccccgagggctactcttgggagcgcaccatgaccttcgaggacaagggcatcgtgaaggtgaagtccgacatctccatggaggaggactccttcatctacgagatacacctcaagggcgagaacttcccccccaacggccccgtgatgcagaaggagaccaccggctgggacgcctccaccgagaggatgtacgtgcgcgacggcgtgctgaagggcgacgtcaagatgaagctgctgctggagggcggcggccaccaccgcgttgacttcaagaccatctacagggccaagaaggcggtgaagctgcccgactatcactttgtggaccaccgcatcgagatcctgaaccacgacaaggactacaacaaggtgaccgtttacgagatcgccgtggcccgcaactccaccgacggcatggacgagctgtacaagtaaatggtgagcaagggcgaggagctgttcaccggggtggtgcccatcctggtcgagctggacggcgacgtaaacggccacaagttcagcgtccgcggcgagggcgagggcgatgccaccaacggcaagctgaccctgaagttcatctgcaccaccggcaagctgcccgtgccctggcccaccctcgtgaccaccttcggctacggcgtggcctgcttcagccgctaccccgaccacatgaagcagcacgacttcttcaagtccgccatgcccgaaggctacgtccaggagcgcaccatctctttcaaggacgacggtacctacaagacccgcgccgaggtgaagttcgagggcgacaccctggtgaaccgcatcgagctgaagggcatcgacttcaaggaggacggcaacatcctggggcacaagctggagtacaacttcaacagccacaacgtctatatcacggccgacaagcagaagaacggcatcaaggctaacttcaagatccgccacaacgttgaggacggcagcgtgcagctcgccgaccactaccagcagaacacccccatcggcgacggccccgtgctgctgcccgacaaccactacctgagccatcagtccgccctgagcaaagaccccaacgagaagcgcgatcacatggtcctgctggagttcgtgaccgccgccgggattacacatggcatggacgagctgtacaagatggtgagcaagggcgaggagctgttcaccggggtggtgcccatcctggtcgagctggacggcgacgtaaacggccacaagttcagcgtccgcggcgagggcgagggcgatgccaccaacggcaagctgaccctgaagttcatctgcaccaccggcaagctgcccgtgccctggcccaccctcgtgaccaccttcggctacggcgtggcctgcttcagccgctaccccgaccacatgaagcagcacgacttcttcaagtccgccatgcccgaaggctacgtccaggagcgcaccatctctttcaaggacgacggtacctacaagacccgcgccgaggtgaagttcgagggcgacaccctggtgaaccgcatcgagctgaagggcatcgacttcaaggaggacggcaacatcctggggcacaagctggagtacaacttcaacagccactacgtctatatcacggccgacaagcagaagaacagcatcaaggctaacttcaagatccgccacaacgttgaggacggcagcgtgcagctcgccgaccactaccagcagaacacccccatcggcgacggccccgtgctgctgcccgacaaccactacctgagccatcagtccaagctgagcaaagaccccaacgagaagcgcgatcacatggtcctgctggagttcgtgaccgccgccgggatcactctcggcatggacgagctgtacaagtaaatggtgagcaagggcgaggagctgttcaccggggtggtgcccatcctggtcgagctggacggcgacgtaaacggccacaagttcagcgtccgcggcgagggcgagggcgatgccaccaacggcaagctgaccctgaagttcatctgcaccaccggcaagctgcccgtgccctggcccaccctcgtgaccaccttcggctacggcgtggcctgcttcagccgctaccccgaccacatgaagcagcacgacttcttcaagtccgccatgcccgaaggctacgtccaggagcgcaccatctctttcaaggacgacggtacctacaagacccgcgccgaggtgaagttcgagggcgacaccctggtgaaccgcatcgagctgaagggcatcgacttcaaggaggacggcaacatcctggggcacaagctggagtacaacttcaacagccactacgtctatatcacggccgacaagcagaagaactgcatcaaggctaacttcaagatccgccacaacgttgaggacggcagcgtgcagctcgccgaccactaccagcagaacacccccatcggcgacggccccgtgctgctgcccgacaaccactacctgagccatcagtccaagctgagcaaagaccccaacgagaagcgcgatcacatggtcctgctggagttcgtgaccgccgccgggattacacatggcatggacgagctgtacaagtaaatggtgagcaagcagatcctgaagaacaccggcctgcaggagatcatgagcttcaaggtgaacctggagggcgtggtgaacaaccacgtgttcaccatggagggctgcggcaagggcaacatcctgttcggcaaccagctggtgcagatccgcgtgaccaagggcgcccccctgcccttcgccttcgacatcctgagccccgccttccagtacggcaaccgcaccttcaccaagtaccccgaggacatcagcgacttcttcatccagagcttccccgccggcttcgtgtacgagcgcaccctgcgctacgaggacggcggcctggtggagatccgcagcgacatcaacctgatcgaggagatgttcgtgtaccgcgtggagtacaagggccgcaacttccccaacgacggccccgtgatgaagaagaccatcaccggcctgcagcccagcttcgaggtggtgtacatgaacgacggcgtgctggtgggccaggtgatcctggtgtaccgcctgaacagcggcaagttctacagctgccacatgcgcaccctgatgaagagcaagggcgtggtgaaggacttccccgagtaccacttcatccagcaccgcctggagaagacctacgtggaggacggcggcttcgtggagcagcacgagaccgccatcgcccagctgaccagcctgggcaagcccctgggcagcctgcacgagtgggtgtaaatgtctctcccagcgacacatgagttacacatctttggctccttcaacggtgtggactttgacatggtgggtcgtggcaccggcaatccaaatgatggttatgaggagttaaacctgaagtccaccaagggtgccctccagttctccccctggatcctggtccctcaaatcgggtatggcttccatcagtacctgcccttccccgacgggatgtcgcctttccaggccgccatgaaagatggctccggataccaagtccatcgcacaatgcagtttgaagacggtgcctccctgacttccaactaccgctacacctacgagggaagccacatcaaaggagagtttcaggtgatcgggactggtttccctgctgacggtcctgtgatgaccaactcgctgaccgctgcggactggtgcgtgaccaagatgctgtaccccaacgacaaaaccatcatcagcacctttgactggacttacaccactggaagtggcaagcgctaccagagcacagtgcggaccaactacacctttgccaagccaatggcggccaacatcctgaagaaccagccgatgttcgtgttccgtaagacggagctcaagcactccaagaccgagctcaacttcaaggagtggcaaaaggcctttaccgatgtgatgtgaatggtgagcaagggcgaggaggataacatggcctctctcccagcgacacatgagttacacatctttggctccatcaacggtgtggactttgacatggtgggtcagggcaccggcaatccaaatgatggttatgaggagttaaacctgaagtccaccaagggtgacctccagttctccccctggattctggtccctcatatcgggtatggcttccatcagtacctgccctaccctgacgggatgtcgcctttccaggccgccatggtagatggctccggataccaagtccatcgcacaatgcagtttgaagatggtgcctcccttactgttaactaccgctacacctacgagggaagccacatcaaaggagaggcccaggtgaaggggactggtttccctgctgacggtcctgtgatgaccaactcgctgaccgctgcggactggtgcaggtcgaagaagacttaccccaacgacaaaaccatcatcagtacctttaagtggagttacaccactggaaatggcaagcgctaccggagcactgcgcggaccacctacacctttgccaagccaatggcggctaactatctgaagaaccagccgatgtacgtgttccgtaagacggagctcaagcactccaagaccgagctcaacttcaaggagtggcaaaaggcctttaccgatgtgatgggcatggacgagctgtacaagtaaatggtgagcaagggcgaggagaataacatggccatcatcaaggagttcatgcgcttcaaggtgcgcatggagggctccgtgaacggccacgagttcgagatcgagggcgagggcgagggccgcccctacgagggctttcagaccgttaagctgaaggtgaccaagggtggccccctgcccttcgcctgggacatcttgtcccctcagttcacctacggctccaaggcctacgtgaagcaccccgccgacatccccgactacctcaagctgtccttccccgagggcttcaagtgggagcgcgtgatgaacttcgaggacggcggcgtggtgaccgtgactcaggactcctccctgcaggacggcgagttcatctacaaggtgaagctgcgcggcaccaacttcccctccgacggccccgtaatgcagaagaagaccatgggcatggaggcctcctccgagcggatgtaccccgaggacggcgccctgaagggcgaggacaagctcaggctgaagctgaaggacggcggccactacacctccgaggtcaagaccacctacaaggccaagaagcccgtgcagttgcccggcgcctacatcgtcgacatcaagttggacatcacctcccacaacgaggactacaccatcgtggaacagtacgaacgcgccgagggccgccactccaccggcggcatggacgagctgtacaagtaaatggtgagcaagggcgaggaggataacatggccatcatcaaggagttcatgcgtttcaaggtgcacgtggagggctccgtgaacggccacgagttcgagatcgtgggcgagggcgagggccgcccctacgagggcacccagaccgccaagctgaaggtgaccaagggtggccccctgcccttcgcctgggacatcctgtcccctcagttcatgtacggctccagggcctacgtgaagcaccccgccgacatccccgactactggaagctgtccttccccgagggcttcaagtgggagcgcgtgatgaacttcgaggacggcggcgtggtgaccgtgacccaggactcctccctgcaggacggcgagttcatctacaaggtgaagctgcgcggcaccaacttcccctccgacggccccgtaatgcagaagaagaccatgggctgggaggcctcctccgagcggatgtaccccgaggacggcgccctgaagggcgagatcaagcagaggctgaagctgaaggacggcggccactacgacgttgaggtcaagaccacctacaaggccaagaagcccgtgcagctgcccggcgcctacaacgtcaacatcaagttggacatcacctcccacaacgaggactacaccatcgtggaacagtacgaacgcgccgagggccgccactccaccggcggcatggacgagctgtacaagtaaatggtaagcaagggcgaggaggataacatggccatcatcaaggaattcatgcgtttcaaggtgcacctggagggctccgtggacggccacgagttcgagatcgagggcgagggcgagggccgcccctacgagggcacccagagcgccaagctgaaggtgaccaagggtggccccctgcccttcgcctgggacatcctgtcccctcagttcatgtacggctccagggcctacgtgaagcaccccgccgacatccccgactactggaagctgtccttccccgagggcttcaagtgggagcgcgtgatgaacttcgaggatggcggcgtggtgaccgtgacccaggactcctccctgcaggacggcgagttcatctacaaggtgaagctgcgcggcaccaacttcccttccgacggccccgtaatgcagaagaagaccatgggctgggaggcctcctccgagcggatataccccgaggacggcgccctgaagggcgagatcaagcagaggctgaagctgaaggacggcggccactacgacgctgaggtcaagaccacctacaaggccaagaagcccgtgctgctgcccggcgcctacaacgtcaacatcaagatggacatcacctcccacaacgaggactacaccatcgttgaacagtgcgaacgcgccgagggccaccattccaccggcggcatggacgagctgtacaagtaaatggtgagcaagggcgaggaggataacatggccatcatcaaagagttcatgcgtttcaaagtgcacgtggagggttccgtgaacggccacgagttcgagatcgagggcgagggcaagggccgcccctacgagggcacccagaccgccaagctgaaggtgaccaagggtggccccctgcccttcgcctgggacatcctgtcccctcagttcatgtacggctccagggcctacgtgaagcatcccgccgacatccccgactactggaagctgtccttccccgagggcttcaagtgggagcgcgtgatgaacttcgaggacggcggcgtggtgaccgtgacccaggactcctccctgcaggacggcgagttcatctacaaggtgaagctgcgcggaactaacttcccctccgacggccccgtaatgcagaagaagaccatgggctgggaggcctccaccgagcggatgtaccccgaggacggcgccctgaagggcgagatcaagcagaggctgaagctgaaggacggcggccactacgacgctgaggtcaagaccacctacaaggccaagaagcccgtgcagctgcccggcgcctacaacgtcaatatcaagttggacatcacatcccacaacgaggactacaccatcgtggaacagtacgaacgctccgagggccgccactccaccggcggcatggacgagctgtacaagtaaatggtgagcaagggcgaggagaataatatggccatcatcaaggagttcatgcgcttcaaggtgcgcatggagggcaccgtgaacggccacgagttcgagatcgagggcgagggcgagggccgcccctacgagggctttcagaccgctaagctgaaggtgaccaagggcggccccctgcccttcgcctgggacatcctgtcccctctcttcacctacggctccaaggcctacgtgaagcaccccgccgacatccccgactacttcaagctgtccttccccgagggcttcaagtgggagcgcgtgatgaactacgaggacggcggcgtggtgaccgtgacccaggactcctcactgcaggacggcgagttcatctacaaggtgaagatgcgcggcaccaacttcccctccgacggccccgtgatgcagaagaagaccatgggctgggaggcctcctccgagcggatgtaccccgaggacggcgccctgaagggcgagatcaggatgaggctgaagctgaaggacggcggccactacacctccgaggtcaagaccacctacaaggccaagaagtccgtgcagctgcccggcgcctacatcgtcggcatcaagctggacatcacctcccacaacgaggactacaccatcgtggaacagtacgaacgcgccgagggccgccactccaccggcggcatggacgagctgtacaagtaaatggtgagcaagggcgaggagaataatatggccatcattaaggagttcatgcgcttcaaggtgcacatggagggcactgtgaacggccacgagttcgagatcgagggcgagggcgagggccacccctacgagggctttcagaccgctaagctgaaggtgaccaagggcggccccctgcccttcgcctgggacatcctgtcccctctcatcacctacggctccaaggcctacgtgaagcaccccgccgacatccccgactacttcaagctgtccttccccgagggcttcaagtgggagcgcgtgatgaactacgaggacggcggcgtggtgaccgtgacccaggactcctctctgcaggacggcgagttcatctacaaggtgaagatgcgcggcaccaacttcccctccgacggccccgtgatgcagaagaagaccatgggctgggaggcctcctccgagcggatgtaccccgaggacggcgccctgaagggcgagatcaggatgaggctgaagctgaaggatggcggccactacacctccgaggtcaagactacctacaaggccaagaagtccgtgctgctgcccggcgcctacatcgtcggcatcaagctggacatcacctcccacaacgaggactacaccatcgtggaacagtacgaacgctccgaggcccgccactccaccggcggcatggacgagctgtacaagatggtgagcaagggcgaggagctgttcaccggggtggtgcccatcctggtcgagctggacggcgacgtaaacggccacaagttcagcgtgtccggcgagggcgagggcgatgccacctacggcaagctgaccctgaagttcatctgcaccaccggcaagctgcccgtgccctggcccaccctcgtgaccaccttcagctacggcgtgcagtgcttcagccgctaccccgaccacatgaagcagcacgacttcttcaagtccgccatgcccgaaggctacgtccaggagcgcaccatcttcttcaaggacgacggcaactacaagacccgcgccgaggtgaagttcgagggcgacaccctggtgaaccgcatcgagctgaagggcatcgacttcaaggaggacggcaacatcctggggcacaagctggagtacaactacaacagccacaacgtctatatcatggccgacaagcagaagaacggcatcaaggccaacttcaagatccgccacaacatcgaggacggcagcgtgcagctcgccgaccactaccagcagaacacccccatcggcgacggccccgtgctgctgcccgacaaccactacctgagccaccagtccgccctgagcaaagaccccaacgagaagcgcgatcacatggtcctgctggagttcgtgaccgccgccgggatcactctcggcatggacgagctgtacaagatggtgagcaagggcgaggagctgttcaccggggtggtgcccatcctggtcgagctggacggcgacgtaaacggccacaagttcagcgtgtccggcgagggcgagggcgatgccacctacggcaagctgaccctgaagttcatctgcaccaccggcaagctgcccgtgccctggcccaccctcgtgaccaccctgacctacggcgtgctgtgcttcagccgctaccccgaccacatgaagcagcacgacttcttcaagtccgccatgcccgaaggctacgtccaggagcgcaccatcttcttcaaggacgacggcaactacaagacccgcgccgaggtgaagttcgagggcgacaccctggtgaaccgcatcgagctgaagggcatcgacttcaaggaggacggcaacatcctggggcacaagctggagtacaactacaacagccacaacgcctatatcatggccgacaagcagaagaacggcatcaagtctaacttcaagatccgccacaacatcgaggacggcagcgtgcagctcgccgaccactaccagcagaacacccccatcggcgacggccccgtgctgctgcccgacaaccactacctgagcacccagaataagctgagcaaagaccccaacgagaagcgcgatcacatggtcctgctggagttcgtgaccgccgccgggatcactctcggcatggacgagctgtacaagtaaatggtgagcaagggcgaggagctgttcaccggggtggtgcccatcctggtcgagctggacggcgacgtaaacggccacaagttcagcgtgtccggcgagggcgagggcgatgccacctacggcaagctgaccctgaagttcatctgcaccaccggcaagctgcccgtgccctggcccaccctcgtgaccaccctggcctacggcgtgctgtgcttcagccgctaccccgaccacatgaagcagcacgacttcttcaagtccgccatgcccgaaggctacgtccaggagcgcaccatcttcttcaaggacgacggcaactacaagacccgcgccgaggtgaagttcgagggcgacaccctggtgaaccgcatcgagctgaagggcatcgacttcaaggaggacggcaacatcctggggcacaagctggagtacaactacaacagccacaacgtctatatcatggccgacaagcagaagaacggcatcaagtctaacttcaagatccgccacaacatcgaggacggcagcgtgcagctcgccgaccactaccagcagaacacccccatcggcgacggccccgtgctgctgcccgacaaccactacctgagcacccagtccaagctgagcaaagaccccaacgagaagcgcgatcacatggtcctgctggagttcgtgaccgccgccgggatcactctcggcatggacgagctgtacaagatgagtgtgattaaaccagacatgaagatcaagctgcgtatggaaggcgctgtaaatggacacccgttcgcgattgaaggagttggccttgggaagcctttcgagggaaaacagagtatggaccttaaagtcaaagaaggcggacctctgcctttcgcctatgacatcttgacaatggccttctgttacggcaacagggtattcgccaaatacccagaaaatatagtagattatttcaagcagtcgtttcctgagggctactcttgggaacgaagcatgatttacgaagacgggggcatttgtatcgcgacaaacgacataaccctggatggtgactgttatatctatgaaattcgatttgatggtgtgaactttcctgccaatggtccagttatgcagaagaggactgtgaaatgggagccatccactgagaaattgtatgtgcgtgatggagtgctgaagagcgatggcaattacgctctgtcgcttgaaggaggtggccactaccgatgtgactccaaaactacttataaagctaagaaggttgtccagttgccagactatcacgatgtggtccaccacattgagattaaaagccacgacagagattacagtaatgttaatctgcatgagcatgccgaagcgcattctgggctgccgaggcaggccaagtaaatgagtgcgattaagccagacatgaagatcaacctccgtatggaaggcaacgtaaacgggcaccactttgtgatcgacggagatggtacaggcaagccttttgagggaaaacagagtatggatcttgaagtcaaagagggcggacctctgccttttgcctttgatatcctgaccactgcattccattacggcaacagggtattcgccgaatatccagaccacatacaagactattttaagcagtcgtttcctaaggggtattcgtgggaacgaagcttgactttcgaagacgggggcatttgcattgccagaaacgacataacaatggaaggggacactttctataataaagttcgatttcacggtgtaaactttcccgccaatggtccagttatgcagaagaagacgctgaaatgggagccctccactgagaaaatgtatgtgcgtgatggagtgctgacgggtgatattaccatggctttgttgcttgaaggaaatgcccattaccgatgtgacttcagaactacttacaaagctaaggagaagggtgtcaagttaccaggctaccactttgtggaccactgcattgagattttaagccatgacaaagattacaacaaggttaagctgtatgagcatgctgttgctcattctggattgcctgacaatgccagacgataaatgagtgcgattaagccagacatgaagatcaaactccgtatggaaggcaacgtaaacgggcaccactttgtgatcgacggagatggtacaggcaagccttttgagggaaaacagagtatggatcttgaagtcaaagagggcggacctctgccttttgcctttgatatcctgaccactgcattccattacggcaacagggtattcgccaaatatccagacaacatacaagactattttaagcagtcgtttcctaaggggtattcgtgggaacgaagcttgactttcgaagacgggggcatttgcattgccagaaacgacataacaatggaaggggacactttctataataaagttcgattttatggtaccaactttcccgccaatggtccagttatgcagaagaagacgctgaaatgggagccctccactgagaaaatgtatgtgcgtgatggagtgctgacgggtgatattcatatggctttgttgcttgaaggaaatgcccattaccgatgtgacttcagaactacttacaaagctaaggagaagggtgtcaagttaccaggctaccactttgtggaccactgcattgagattttaagccatgacaaagattacaacaaggttaagctgtatgagcatgctgttgctcattctggattgcctgacaatgccagacgataaatgagtgcgattaagccagacatgaagatcaaactccgtatggaaggcaacgtaaacgggcaccactttgtgatcgacggagatggtacaggcaagccttttgagggaaaacagagtatggatcttgaagtcaaagagggcggacctctgccttttgcctttgatatcctgaccactgcattccattacggcaacagggtattcgccaaatatccagacaacatacaagactattttaagcagtcgtttcctaaggggtattcgtgggaacgaagcttgactttcgaagacgggggcatttgcaacgccagaaacgacataacaatggaaggggacactttctataataaagttcgattttatggtaccaactttcccgccaatggtccagttatgcagaagaagacgctgaaatgggagccctccactgagaaaatgtatgtgcgtgatggagtgctgacgggtgatattgagatggctttgttgcttgaaggaaatgcccattaccgatgtgacttcagaactacttacaaagctaaggagaagggtgtcaagttaccaggcgcccactttgtggaccactgcattgagattttaagccatgacaaagattacaacaaggttaagctgtatgagcatgctgttgctcattctggattgcctgacaatgccagacgataaatggttagtgcgattaagccagacatgaggatcaaactccgtatggaaggcaacgtaaacgggcaccactttgtgatcgacggagatggtacaggcaagccttatgagggaaaacagaccatggatcttgaagtcaaagagggcggacctctgccttttgcctttgatatcctgaccactgcattccattacggcaacagggtattcgttaaatatccagacaacatacaagactattttaagcagtcgtttcctaaggggtattcgtgggaacgaagcttgactttcgaagacgggggcatttgctatgccagaaacgacataacaatggaaggggacactttctataataaagttcgattttatggtaccaactttcccgccaatggtccagttatgcagaagaagacgctgaaatgggagccctccactgagaaaatgtatgtgcgtgatggagtgctgacgggtgatattcatatggctttgttgcttgaaggaaatgcccattaccgatgtgacttcagaactacttacaaagctaaggagaagggtgtcaagttaccaggctaccactttgtggaccacgccattgagattttaagccatgacaaagattacaacaaggttaagctgtatgagcatgctgttgctcattctggattgcctgacaatgccagacgataaatggtgagtgcgattaagccagacatgaggatcaaactccgtatggaaggcaacgtaaacgggcaccactttgtgatcgacggagatggtacaggcaagccttatgagggaaaacagaccatggatcttgaagtcaaagagggcggacctctgccttttgcctttgatatcctgaccactgcattccattacggcaacagggtattcgtgaaatatccagacaacatacaagactattttaagcagtcgtttcctaaggggtattcgtgggaacgaagcttgactttcgaagacgggggcatttgcaatgccagaaacgacataacaatggaaggggacactttctataataaagttcgattttatggtaccaactttcccgccaatggtccagttatgcagaagaagacgctgaaatgggagccctccactgagaaaatgtatgtgcgtgatggagtgctgacgggtgatattgagatggctttgttgcttgaaggaaatgcccattaccgatgtgacttcagaactacttacaaagctaaggagaagggtgtcaagttaccaggcgcccactttgtggaccacgccattgagattttaagccatgacaaagattacaacaaggttaagctgtatgagcatgctgttgctcattctggattgcctgacaatgccagacgataaatggtgagcaagggcgaggagaccatcatgagcgtgatcaagcctgacatgaagatcaagctgcgcatggagggcaacgtgaacggccacgccttcgtgatcgagggcgagggcagcggcaagcccttcgagggcatccagacgattgatttggaggtgaaggagggcgccccgctgcccttcgcctacgacatcctgaccaccgccttccactacggcaaccgcgtgttcaccaagtaccccgaggacatccctgactacttcaagcagagcttccccgagggctacagctgggagcgcagcatgacctacgaggacggcggcatctgcatcgccaccaacgacatcacgatggaggaggacagcttcatcaacaagatccacttcaagggcacgaacttcccccccaacggccccgtgatgcagaagaggaccgtgggctgggaggccagcaccgagaagatgtacgtgcgcgacggcgtgctgaagggcgacgtgaagatgaagctgctgctgaagggcggcggccactaccgctgcgacttccgcaccacctacaaggtcaagcagaaggccgtaaagctgcccgactaccacttcgtggaccaccgcatcgagatcctgagccacgacaaggactacaacaaggtgaagctgtacgagcacgccgtggcccacagcggcctgcccggcatggacgagctgtacaagtaaatggtgagcaagggcgaggagaccattatgagcgtgatcaagcctgacatgaagatcaagctgcgcatggagggcaacgtgaacggccacgccttcgtgatcgagggcgagggcagcggcaagcccttcgagggcatccagacgattgatttggaggtgaaggagggcgccccgctgcccttcgcctacgacatcctgaccaccgccttccactacggcaaccgcgtgttcaccaagtaccccgaggacatccctgactacttcaagcagagcttccccgagggctacagctgggagcgcagcatgacctacgaggacggcggcatctgcatcgccaccaacgacatcacaatggaggaggacagcttcatcaacaagatccacttcaagggcacgaacttcccccccaacggccccgtgatgcagaagaggaccgtgggctgggaggtcagcaccgagaagatgtacgtgcgcgacggcgtgctgaagggcgacgtgaagatgaagctgctgctgaagggcggcagccactatcgctgcgacttccgcaccacctacaaggtcaagcagaaggccgtaaagctgcccgactaccacttcgtggaccaccgcatcgagatcctgagccacgacaaggactacaacaaggtgaagctgtacgagcacgccgtggcccgcaactccaccgacagcatggacgagctgtacaagtaaatggtgtctaagggcgaagagctgattaaggagaacatgcacatgaagctgtacatggagggcaccgtgaacaaccaccacttcaagtgcacatccgagggcgaaggcaagccctacgagggcacccagaccatgagaatcaaggtggtcgagggcggccctctccccttcgccttcgacatcctggctaccagcttcatgtacggcagccgcaccttcatcaaccacacccagggcatccccgacttctggaagcagtccttccctgagggcttcacatgggagagagtcaccacatacgaagacgggggcgtgctgaccgctacccaggacaccagcctccaggacggctgcctcatctacaacgtcaagctcagaggggtgaacttcccatccaacggccctgtgatgcagaagaaaacactcggctgggaggccgccaccgagatgctgtaccccgctgacggcggcctggaaggcagaggggacatggccctgaagctcgtgggcgggggccacctgatctgcaacttgaagaccacatacagatccaagaatcccgctaagaacctcaagatgcccggcgtctactttgtggaccacagactggaaagaatcaaggaggccgacaaagagacctacgtcgagcagcacgaggtggctgtggccagatactgcgacctccctagcaaactggggcacaagcttaatatgacagctctgacagagggagcgaaactgttcgagaaggagatcccgtacatcacagagttggaaggagatgtcgaagggatgaaattcatcatcaagggagaaggaacgggtgacgcaacgaccggaacgatcaaggccaaatacatttgtaccacgggcgatttgcctgtcccctgggcgacgcttgtaagcacgctctcgtatggtgtccagtgcttcgcgaaatatccatcgcacattaaggactttttcaagtcggccatgccagaaggttacacacaagaacgaaccatctcctttgagggggacggagtgtataagacacgcgcgatggtaacgtacgagcgcgggtccatctacaacagggtaactcttactggggagaactttaagaaggacgggcatatcttgcggaaaaacgtggcatttcaatgtccgccctcgattctgtatattctcccggacacggtgaataatgggatcagagtggagttcaaccaggcatacgatattgagggtgtgactgaaaagctcgtcaccaaatgcagccagatgaatcgcccccttgcgggatcagcagccgtccatatcccccggtatcaccatattacctaccacacaaaactctcaaaagacagagatgagagaagggaccatatgtgcctggtcgaagtagtgaaggcggtggatcttgatacataccagtagatggctgaaggatccgtcgccaggcagcctgacctcttgacctgcgacgatgagccgatccatatccccggtgccatccaaccgcatggactgctgctcgccctcgccgccgacatgacgatcgttgccggcagcgacaaccttcccgaactcaccggactggcgatcggcgccctgatcggccgctctgcggccgatgtcttcgactcggagacgcacaaccgtctgacgatcgccttggccgagcccggggcggccgtcggagcaccgatcactgtcggcttcacgatgcgaaaggacgcaggcttcatcggctcctggcatcgccatgatcagctcatcttcctcgagctcgagcctccccagcgggacgtcgccgagccgcaggcgttcttccgccgcaccaacagcgccatccgccgcctgcaggccgccgaaaccttggaaagcgcctgcgccgccgcggcgcaagaggtgcggaagattaccggcttcgatcgggtgatgatctatcgcttcgcctccgacttcagcggcgaagtgatcgcagaggatcggtgcgccgaggtcgagtcaaaactaggcctgcactatcctgcctcaaccgtgccggcgcaggcccgtcggctctataccatcaacccggtacggatcattcccgatatcaattatcggccggtgccggtcaccccagacctcaatccggtcaccgggcggccgattgatcttagcttcgccatcctgcgcagcgtctcgcccgtccatctggaattcatgcgcaacataggcatgcacggcacgatgtcgatctcgattttgcgcggcgagcgactgtggggattgatcgtttgccatcaccgaacgccgtactacgtcgatctcgatggccgccaagcctgcgagctagtcgcccaggttctggcctggcagatcggcgtgatggaagagtgaatggcgcgtaaggtcgatctcacctcctgcgatcgcgagccgatccacatccccggcagcattcagccgtgcggctgcctgctagcctgcgacgcgcaggcggtgcggatcacgcgcattacggaaaatgccggcgcgttctttggacgcgaaactccgcgggtcggtgagctactcgccgattacttcggcgagaccgaagcccatgcgctgcgcaacgcactggcgcagtcctccgatccaaagcgaccggcgctgatcttcggttggcgcgacggcctgaccggccgcaccttcgacatctcactgcatcgccatgacggtacatcgatcatcgagttcgagcctgcggcggccgaacaggccgacaatccgctgcggctgacgcggcagatcatcgcgcgcaccaaagaactgaagtcgctcgaagagatggccgcacgggtgccgcgctatctgcaggcgatgctcggctatcaccgcgtgatgttgtaccgcttcgcggacgacggctccgggatggtgatcggcgaggcgaagcgcagcgacctcgagagctttctcggtcagcactttccggcgtcgctggtcccgcagcaggcgcggctactgtacttgaagaacgcgatccgcgtggtctcggattcgcgcggcatcagcagccggatcgtgcccgagcacgacgcctccggcgccgcgctcgatctgtcgttcgcgcacctgcgcagcatctcgccctgccatctcgaatttctgcggaacatgggcgtcagcgcctcgatgtcgctgtcgatcatcattgacggcacgctatggggattgatcatctgtcatcattacgagccgcgtgccgtgccgatggcgcagcgcgtcgcggccgaaatgttcgccgacttcttatcgctgcacttcaccgccgcccaccaccaacgctaaatggcggaaggatccgtcgccaggcagcctgacctcttgacctgcgacgatgagccgatccatatccccggtgccatccaaccgcatggactgctgctcgccctcgccgccgacatgacgatcgttgccggcagcgacaaccttcccgaactcaccggactggcgatcggcgccctgatcggccgctctgcggccgatgtcttcgactcggagacgcacaaccgtctgacgatcgccttggccgagcccggggcggccgtcggagcaccgatcactgtcggcttcacgatgcgaaaggacgcaggcttcatcggctcctggcatcgccatgatcagctcatcttcctcgagctcgagcctccccagcgggacgtcgccgagccgcaggcgttcttccgccgcaccaacagcgccatccgccgcctgcaggccgccgaaaccttggaaagcgcctgcgccgccgcggcgcaagaggtgcggaagattaccggcttcgatcgggtgatgatctatcgcttcgcctccgacttcagcggggtggtgatcgcagaggatcgatgcgccgaggtcgagtcaaaactaggcctgcactatcctgcctcagcggtgccggcgcaggcccgtcggctctataccatcaacccggtacggatcattcccgatatcaattatcggccggtgccggtcaccccagacctcaatccggtcaccgggcggccgattgatcttagcttcgccatcctgcgcagcgtctcgccctgccatttggagttcatgcgcaacataggcatgcacggcacgatgtcgatctcgattttgcgcggcgagcgactgtggggattgatcgtttgccatcaccgaacgccgtactacgtcgatctcgatggccgccaagcctgcgagctagtcgcccaggttctggcctggcagatcggcgtgatggaagagtgaatggcgcgtaaggtcgatctcacctcctgcgatcgcgagccgatccacatccccggcagcattcagccgtgcggctgcctgctagcctgcgacgcgcaggcggtgcggatcacgcgcattacggaaaatgccggcgcgttctttggacgcgaaactccgcgggtcggtgagctactcgccgattacttcggcgagaccgaagcccatgcgctgcgcaacgcactggcgcagtcctccgatccaaagcgaccggcgctgatcttcggttggcgcgacggcctgaccggccgcaccttcgacatctcgctgcatcgccatgacggtacatcgatcatcgagttcgagcctgcggcggccgaacaggccgacaatccgctgcggctgacgcggcagatcatcgcgcgcaccaaagaactgaagtcgctcgaagagatggccgcacgggtgccgcgctatctgcaggcgatgctcggctatcaccgcgtgatgttgtaccgcttcgcggacgacggctccggcaaagtgatcggcgaggcgaagcgcagcgacctcgagagctttctcggtcagcactttccggcgtcgctggtcccgcagcaggcgcggctactgtacttgaagaacgcgatccgcgtggtctcggattcgcgcggcatcagcagccggatcgtgcccgagcacgacgcctccggcgccgcgcttgatctgtcgttcgcgcacctgcgcagcatctcgcctatccatctcgaatttctgcggaacatgggcgtcagcgcctcgatgtcgctgtcgatcatcattgacggcacgctatggggattgatcatctgtcatcattacgagccgcgtgccgtgccgatggcgcagcgcgtcgcggccgaaatgttcgccgacttcttatcgctgcacttcaccgccgcccaccaccaacgctaaatggcggaaggatccgtcgccaggcagcctgacctcttgacctgcgacgatgagccgatccatatccccggtgccatccaaccgcatggactgctgctcgccctcgccgccgacatgacgatcgttgccggcagcgacaaccttcccgaactcaccggactggcgatcggcgccctgatcggccgctctgcggccgatgtcttcgactcggagacgcacaaccgtctgacgatcgccttggccgagcccggggcggccgtcggagcaccgatcactgtcggcttcacgatgcgaaaggacgcaggcttcatcggctcctggcatcgccatgatcagctcatcttcctcgagctcgagcctccccagcgggacgtcgccgagccgcaggcgttcttccgccgcaccaacagcgccatccgccgcctgcaggccgccgaaaccttggaaagcgcctgcgccgccgcggcgcaagaggtgcggaagattaccggcttcgatcgggtgatgatctatcgcttcgcctccgacttcagcgggtccgtgatcgcagaggatcggtgcgccgaggtcgagtcaaaactaggcctgcactatcctgcctcattcatcccggcgcaggcccgtcggctctataccatcaacccggtacggatcattcccgatatcaattatcggccggtgccggtcaccccagacctcaatccggtcaccgggcggccgattgatcttagcttcgccatcctgcgcagcgtctcgcccaaccatctggagttcatgcgcaacataggcatgcacggcacgatgtcgatctcgattttgcgcggcgagcgactgtggggattgatcgtttgccatcaccgaacgccgtactacgtcgatctcgatggccgccaagcctgcgagctagtcgcccaggttctggcctggcagatcggcgtgatggaagagtgaatggtagcaggtcatgcctctggcagccccgcattcgggaccgcctctcattcgaattgcgaacatgaagagatccacctcgccggctcgatccagccgcatggcgcgcttctggtcgtcagcgaacatgatcatcgcgtcatccaggccagcgccaacgccgcggaatttctgaatctcggaagcgtactcggcgttccgctcgccgagatcgacggcgatctgttgatcaagatcctgccgcatctcgatcccaccgccgaaggcatgccggtcgcggtgcgctgccggatcggcaatccctctacggagtactgcggtctgatgcatcggcctccggaaggcgggctgatcatcgaactcgaacgtgccggcccgtcgatcgatctgtcaggcacgctggcgccggcgctggagcggatccgcacggcgggttcactgcgcgcgctgtgcgatgacaccgtgctgctgtttcagcagtgcaccggctacgaccgggtgatggtgtatcgtttcgatgagcaaggccacggcctggtattctccgagtgccatgtgcctgggctcgaatcctatttcggcaaccgctatccgtcgtcgactgtcccgcagatggcgcggcagctgtacgtgcggcagcgcgtccgcgtgctggtcgacgtcacctatcagccggtgccgctggagccgcggctgtcgccgctgaccgggcgcgatctcgacatgtcgggctgcttcctgcgctcgatgtcgccgtgccatctgcagttcctgaaggacatgggcgtgcgcgccaccctggcggtgtcgctggtggtcggcggcaagctgtggggcctggttgtctgtcaccattatctgccgcgcttcatccgtttcgagctgcgggcgatctgcaaacggctcgccgaaaggatcgcgacgcggatcaccgcgcttgagagctaaatggtagcaggtcatgcctctggcagccccgcattcgggaccgcctctcattcgaattgcgaacatgaagagatccacctcgccggctcgatccagccgcatggcgcgcttctggtcgtcagcgaacatgatcatcgcgtcatccaggccagcgccaacgccgcggaatttctgaatctcggaagcgtactcggcgttccgctcgccgagatcgacggcgatctgttgatcaagatcctgccgcatctcgatcccaccgccgaaggcatgccggtcgcggtgcgctgccggatcggcaatccctctacggagtactgcggtctgatgcatcggcctccggaaggcgggctgatcatcgaactcgaacgtgccggcccgtcgatcgatctgtcaggcacgctggcgccggcgctggagcggatccgcacggcgggttcactgcgcgcgctgtgcgatgacaccgtgctgctgtttcagcagtgcaccggctacgaccgggtgatggtgtatcgtttcgatgagcaaggccacggcctggtattctccgagtgccatgtgcctgggctcgaatcctatttcggcaaccgctatccgtcgtcgctggtcccgcagatggcgcggcagctgtacgtgcggcagcgcgtccgcgtgctggtcgacgtcacctatcagccggtgccgctggagccgcggctgtcgccgctgaccgggcgcgatctcgacatgtcgggctgcttcctgcgctcgatgtcgccgatccatctgcagttcctgaaggacatgggcgtgcgcgccaccctggcggtgtcgctggtggtcggcggcaagctgtggggcctggttgtctgtcaccattatctgccgcgcttcatccgtttcgagctgcgggcgatctgcaaacggctcgccgaaaggatcgcgacgcggatcaccgcgcttgagagctaaatggtagcaggtcatgcctctggcagccccgcattcgggaccgcctctcattcgaattgcgaacatgaagagatccacctcgccggctcgatccagccgcatggcgcgcttctggtcgtcagcgaacatgatcatcgcgtcatccaggccagcgccaacgccgcggaatttctgaatctcggaagcgtactcggcgttccgctcgccgagatcgacggcgatctgttgatcaagatcctgccgcatctcgatcccaccgccgaaggcatgccggtcgcggtgcgctgccggatcggcaatccctctacggagtactgcggtctgatgcatcggcctccggaaggcgggctgatcatcgaactcgaacgtgccggcccgtcgatcgatctgtcaggcacgctggcgccggcgctggagcggatccgcacggcgggttcactgcgcgcgctgtgcgatgacaccgtgctgctgtttcagcagtgcaccggctacgaccgggtgatggtgtatcgtttcgatgagcaaggccacggcctggtattctccgagtgccatgtgcctgggctcgaatcctatttcggcaaccgctatccgtcgtcgttcatcccgcagatggcgcggcagctgtacgtgcggcagcgcgtccgcgtgctggtcgacgtcacctatcagccggtgccgctggagccgcggctgtcgccgctgaccgggcgcgatctcgacatgtcgggctgcttcctgcgctcgatgtcgccgatccatctgcagttcctgaaggacatgggcgtgcgcgccaccctggcggtgtcgctggtggtcggcggcaagctgtggggcctggttgtctgtcaccattatctgccgcgcttcatccgtttcgagctgcgggcgatctgcaaacggctcgccgaaaggatcgcgacgcggatcaccgcgcttgagagctaaatggctcgggaccctctgccattctttccacctctgtacctgggcggccctgagattacaaccgagaactgcgagagagagcctatccacattcctgggtccatccagccacacggggctctgctcacagctgacggccactccggagaggtgctccaaatgtccctgaatgccgctaccttcctgggccaggagcctactgtgctgcgggggcagaccctggctgccctgctccccgagcagtggccagccctgcaggcagccctgcccccaggatgtccagatgccctccaatacagggccaccctcgactggccagctgctgggcacctcagcctgactgtgcatcgggtgggggaactcctgatcctggagttcgaacctaccgaggcctgggacagcactggccctcacgccctgaggaacgccatgtttgctctggaaagcgctccaaacctgcgggctctggccgaagtcgcaacacaaactgtgagagaactgactggcttcgatcgggtgatgctgtacaaatttgcccctgacgccactggagaggtgattgctgaggccagacgggagggcctccacgcttttctgggccacaggtttcccgcatcccacacccctgcacaagctagggccctctacacaagacacctgctccggctgaccgcagacaccagggctgcagcagtgcccctcgaccccgtgctgaatccccagacaaatgctcctacacctctgggcggagctgtcctcagagctacatccccaatgcacatgcagtacctgaggaatatgggagtgggctcctccctgagcgtcagcgtcgtggtcggcggccagctgtggggactgattgtctgccaccatcagacaccctacgtgctgccaccagatctgcggaccaccctggagtatctggggaggctcctgtccctgcaggtgcaggtgaaagaagcctgaatggctcgggaccctctgccattctttccacctctgtacctgggcggccctgagattacaaccgagaactgcgagagagagcctatccacattcctgggtccatccagccacacggggctctgctcacagctgacggccactccggagaggtgctccaagtgtccctgaatgccgctaccttcctgggccaggagcctactgtgctgcgggggcagaccctggctgccctgctccccgagcagtggccagccctgcaggcagccctgcccccaggatgtccagatgccctccaatacagggccaccctcgactggccagctgctgggcacctcagcctgactgtgcatcgggtggctgaactcctgatcctggagttcgaacctaccgaggcctgggacagcattggccctcacgccctgaggaacgccatgtttgctctggaaagcgctccaaacctgcgggctctggccgaagtcgcaacacaaactgtgagagaactgactggcttcgatcgggtgatgctgtacaaatttgcccctgacgccactggagagatgattgctgaggccagacgggagggcatgcaggcttttctgggccacaggtttcccgcatcccacacccctgcacaagctagggccctctacacaagacacctgctccggctgaccgcagacaccagggctgcagcagtgcccctcgaccccgtgctgaatccccagacaaatgctcctacacctctgggcggagctgtcctcagagctacatccccaatgcacatgcagtacctgaggaatatgggagtgggctcctccctgagcgtcagcgtcgtggtcggcggccagctgtggggactgattgtctgccaccatcagacaccctacgtgctgccaccagatctgcggaccaccctggaggagctggggagaaagctgtccgggcaggtgcagaggaaagaagccggaatggacgagctgtataaatgaatggctcgggaccctcaacctttcttccctcctctgtatctcggaggaccagagatcactactgagaactgcgagcgggaacctatacatataccaggttctattcaacctcatggagcactgctcacagccgatggacattctggcgaggtgctgcaagtttcactcaacgcagccactttcctgggccaggaaccaactgttctgcggggacagaccctggcagccctgctgccagaccagtggcctgctctgcagactgccctgcctccaggctgccaggacgccctgcagtatcgcgccaccctggattggcccgccgccggacacctgagcctgaccgtgcatagggtggccgagctgctgattctggaattcgagcctactgaggcatgggactctattggaccccacgctctgagaaatgcaatgttcgctctggagagtgctcctaatctccgggcactggctgaagtcgcaacccaaacagtccgggaactgtcaggtttcgaccgggtgatgctgtacaagtttgcaccagacgcaacaggagaggttattgccgaagcaaggcgcgagggcatgcaggcttacctcgggcataggtttcccgcatccaccacccctgcacaagctagggccctctacacaagacacctgctccggctgaccgcagacaccagggctgcagcagtgcccctcgaccccgtgctgaatccccagacaaatgctcctacacctctgggcggagctgtcctcagagctacatccccaatgcacatgcagtacctgaggaatatgggagtgggctcctccctgagcgtcagcgtcgtggtcggcggccagctgtggggactgattgtctgccaccatcagacaccctacgtgctgccacccgatctgcggaccaccctggagtatctggggaggctcctgtccctgcaggtgcagaggaaagaagcctgaatgtcggtaccgctgactacctcagcattcggccacgcgtttctggctaactgtgaacgcgagcagatccacctggcgggctccattcagccgcacggtatcctgctggctgtgaaagagccggacaacgtggtgatccaggcttctattaacgctgcggagttcctgaacaccaactctgttgttggccgtccgctgcgtgacctgggcggcgatctgcctttgcagatcctgccgcacctgaacggcccgctgcacctggctccgatgaccctgcgttgtaccgtgggttctccgccgcgtcgtgtggactgtaccattcatcgtccgtctaacggcggcctgatcgtagaactggaaccagcaaccaagaccactaacattgcgccggctctggacggtgcgtttcatcgtatcacttcttcatcctccctgatgggcctgtgtgacgaaaccgcgactattatccgtgagattactggctacgaccgtgtgatggtagtacgtttcgatgaagagggtaatggcgaaattctgtccgaacgtcgtcgtgcggacctggaagcgttcctgggtaaccgctacccggcgtctactattccgcagatcgctcgtcgcctgtacgaacataaccgtgttcgcctgctggtagatgtgaactatactccggttccgctacagccgcgcatcagcccgctgaacggtcgtgatctggatatgtccctgtcttgcctgcgctctatgtccccgatccaccagaaatacatgcaggacatgggcgttggcgcgaccctggtttgctctctgatggtgtctggtcgtctgtggggtctgatcgcttgccaccactacgaaccgcgcttcgttccgttccacattcgcgctgctggcgaagcgctggcggaaacttgtgcgatccgcatcgcgacgctggagagctttgcacagtctcagtccaaaatggctaagacttccgaacagagggtgaacattgctacactgctgacagaaaataagaagaaaatcgtggataaggcttcccaggatctgtggcggagacacccagacctgatcgcaccaggaggaattgctttctctcagagggaccgcgctctgtgcctgcgagattacggctggttcctgcatctgatcaccttttgtctgctggccggagataagggccccatcgagtctattgggctgatcagtattcgagaaatgtataactcactgggagtgcccgtccctgcaatgatggagagcattagatgcctgaaagaagccagcctgtccctgctggacgaagaggacgccaacgagaccgcaccctactttgattacattattaaggctatgagctaaatggctaagacttccgaacagagggtgaacattgctacactgctgacagaaaataagaagaaaatcgtggataaggcttcccaggatctgtggcggagacacccagacctgatcgcaccaggaggaattgctttctctcagagggaccgcgctctgtgcctgcgagattacggctggttcctgcatctgatcaccttttgtctgctggccggagataagggccccatcgagtctattgggctgatcagtattcgagaaatgtataactcactgggagtgcccgtccctgcaatgatggagagcattagatgcctgaaagaagccagcctgtccctgctggacgaagaggacgccaacgagaccgcaccctactttgattacattattaaggctatgagcgggcatggcaccggcagcaccggcagcggcagctccggcaccgcctcctccgaggacaacaacatggccatggctaagacttccgaacagagggtgaacattgctacactgctgacagaaaataagaagaaaatcgtggataaggcttcccaggatctgtggcggagacacccagacctgatcgcaccaggaggaattgctttctctcagagggaccgcgctctgtgcctgcgagattacggctggttcctgcatctgatcaccttttgtctgctggccggagataagggccccatcgagtctattgggctgatcagtattcgagaaatgtataactcactgggagtgcccgtccctgcaatgatggagagcattagatgcctgaaagaagccagcctgtccctgctggacgaagaggacgccaacgagaccgcaccctactttgattacattattaaggctatgagctaaatggtgagcaagggcgaggagaataacatggccatcatcaaggagttcatgcgcttcaaggtgcacatggagggctccgtgaacggccacgagttcgagatcgagggcgagggcgagggccgcccctacgaggcctttcagaccgctaagctgaaggtgaccaagggtggccccctgcccttcgcctgggacatcctgtcccctcagttcatgtacggctccaaggtctacattaagcacccagccgacatccccgactacttcaagctgtccttccccgagggcttcaggtgggagcgcgtgatgaacttcgaggacggcggcattattcacgttaaccaggactcctccctgcaggacggcgtgttcatctacaaggtgaagctgcgcggcaccaacttcccctccgacggccccgtaatgcagaagaagaccatgggctgggaggcctccgaggagcggatgtaccccgaggacggcgccctgaagagcgagattaagtataggctgaagctgaaggacggcggccactacgccgccgaggtcaagaccacctacaaggccaagaagcccgtgcagctgcccggcgcctacatcgtggacatcaagttggacatcgtgtcccacaacgaggactacaccatcgtggaacagtacgaacgcgccgagggccgccactccaccggcggcatggacgagctgtacaagtaaatgagtaaaggagaagaacttttcactggagttgtcccaattcttgttgaattagatggtgatgttaatgggcacaaattttctgtcagtggagagggtgaaggtgatgcaacatacggaaaacttacccttaaatttatttgcactactggaaaactacctgttccatggccaacacttgtcactactttctcttatggtgttcaatgcttttcaagatacccagatcatatgaaacggcatgactttttcaagagtgccatgcccgaaggttatgtacaggaaagaactatatttttcaaagatgacgggaactacaagacacgtgctgaagtcaagtttgaaggtgatacccttgttaatagaatcgagttaaaaggtattgattttaaagatgatggaaacattcttggacacaaattggaatacaactataacgagcacttggtgtacatcatggcagacaaacaaaagaatggtaccaaagctatctttcaagttcaccacaacattgaagatggaggcgttcaactagcagaccattatcaacaaaatactccaattggcgatggccctgtccttttaccagacaaccattacctgcacacacaatctgccctttcgaaagatcccaacgaaaagagagaccacatggtccttcttgagtttgtaacagctgctgggattacacatggcatggatgaactatacaaataaatgagtaaaggagaagaacttttcactggagttgtcccaattcttgttgaattagatggtgatgttaatgggcacaaattttctgtcagtggagagggtgaaggtgatgcaacatacggaaaacttacccttaaatttatttgcactactggaaaactacctgttccatggccaacacttgtcactactttctcttatggtgttcaatgcttttcaagatacccagatcatatgaaacggcatgactttttcaagagtgccat".toLowerCase();
