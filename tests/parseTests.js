// meant to test the annotation standardizer
import fs from 'fs';
import path from 'path';
import csvInput from '../../../data/annotations/parse/coupledParse.js';
import { expect, assert } from 'chai';
//import * as jobApi from '../../src/middleware/jobs';
//import { testUserId } from '../constants';
//import { createExampleRollup } from '../_utils/_rollup';
//import * as projectPersistence from '../../server/data/persistence/projects';

//const extName = 'parseTests';

describe('Annotations', () => {
  describe('Library', () => {
    it('Constructs a library', () => {
      return fs.existsSync(path.resolve(__dirname, '../../data/annotations/library.js'), false);
    });
    it('Has inputs', () => {
      return fs.existsSync(csvInput);
    });
  });
});
