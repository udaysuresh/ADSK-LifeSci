
constructor.extensions.register('Glimmer', 'menu:block', (singleBlockSelected, block) => [{
  text: 'Glimmer',
  disabled: false,
  action: () => {
    console.log('it works');
    console.log(block);
  },
}]);
      /* block.getSequence()
      .then(sequence => constructor.jobs.jobCreate(block.projectId, 'local annotation', { id: block.id, sequence }))
      .then(result => result.jobId)
      .then((jobId) => {
        const construct = constructor.api.blocks.blockClone(block.id, {}, {
          metadata: { name: `Annotation Standardizer: ${block.getName()}` },
          jobId,
          components: [],
          sequence: {
            md5: null,
            length: null,
            url: null,
            initialBases: null,
            trim: null,
            annotations: [],
          },
        });

        constructor.api.projects.projectAddConstruct(block.projectId, construct.id);
      })
      .catch(err => {
        constructor.api.ui.uiSetGrunt('Standardizer did not work...');
        console.error(err); //eslint-disable-line no-console
      }),
  }]);
*/
