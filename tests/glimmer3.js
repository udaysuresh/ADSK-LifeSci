import fs from 'fs';
import path from 'path';
import { expect, assert } from 'chai';
import * as jobApi from '../../src/middleware/jobs';
import { testUserId } from '../constants';
import { createExampleRollup } from '../_utils/_rollup';
import * as projectPersistence from '../../server/data/persistence/projects';
import Delta from '../../src/models/Delta';

const extName = 'glimmer3';

describe('glimmer3', () => {
  const roll = createExampleRollup();
  const projectId = roll.project.id;

  const id = roll.project.components[0];
  const sequence = fs.readFileSync(path.join(__dirname, 'test_sequence'), 'utf8');

  before(() => projectPersistence.projectWrite(projectId, roll, testUserId));

  it('runs a job', async () => {
    try {
      const jobData = { id, sequence };
      const posted = await jobApi.jobCreate(projectId, extName, jobData);
      const jobId = posted.id;

      const jobObj = await jobApi.jobPoll(projectId, jobId, 500);
      assert(jobObj, 'should get result object');

      const result = await jobApi.jobGetResult(projectId, jobId);

      //console.log(result);

      Delta.validate(new Delta(result), true);
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
  it('starts up a job', async () => {
    try {
      const jobData = { id, sequence };
      const posted = await jobApi.jobCreate(projectId, extName, jobData);
      assert(posted.id, 'should get a job ID');
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
  it('if job works -> project', async () => {
    try {
      const jobData = { id, sequence, fail: false };
      const posted = await jobApi.jobCreate(projectId, extName, jobData);
      const jobId = posted.id;

      const jobObj = await jobApi.jobPoll(projectId, jobId, 500);
      assert(jobObj, 'should get result object');

      const result = await jobApi.jobGetResult(projectId, jobId);

      Delta.validate(result, true);
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
});
