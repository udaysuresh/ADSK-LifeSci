constructor.extensions.register('glimmer3', 'menu:block', (singleBlockSelected, block) => {
  if (!block) {
    return [];
  }

  const sequenceLength = window.constructor.api.blocks.blockGetSequenceLength(block.id);
  const disabled = !isFinite(sequenceLength) || sequenceLength < 100;

  return [{
    text: 'Glimmer3',
    disabled,
    action: () => {
      const jobName = `Glimmer ${block.getName()}`;

      return window.constructor.api.jobs.jobCreateAnnotationJob(block.projectId, block.id, 'glimmer3', {}, { name: jobName })
      .catch((err) => {
        console.error(err); //eslint-disable-line no-console
        constructor.api.ui.uiSetGrunt('There was an error starting your Glimmer search...');
      });
    },
  }];
});
