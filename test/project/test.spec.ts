import { expect } from 'chai';
import 'mocha';
import { machineLearningVersion } from '../../lib';

describe('Project tests', () => {

  it('Version number test', () => {
    expect(machineLearningVersion()).to.equal('0.0.1');
  });
});