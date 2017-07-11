
constructor.extensions.register('annotation_standardizer', 'menu:block', (singleBlockSelected, block) => [{
  text: 'Annotation Constructor',
  disabled: false,
  action: () => {
    console.log('wild!');
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
