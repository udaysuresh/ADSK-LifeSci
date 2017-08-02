//assume that var annotations has been defined

// JS way
// array.filter(() => {})
// .reduce(() => {})
// .map(() => {})


// expose on the window
window.makeAnnotations = function makeAnnotations() {
  //const start = +Date.now();
  const construct = window.constructor.api.focus.focusGetConstruct();
  const tree = window.constructor.api.projects.projectCreateProjectTree(construct.projectId);
  const blocks = tree.leaves(construct.id).map(node => node.data);

  Promise.all(blocks.map(block => block.getSequence()))
  .then(sequences => sequences.join(''))
  .then((sequence) => {
    console.log(sequence);
  });
};
