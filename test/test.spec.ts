import { expect } from 'chai';
import 'mocha';
import { machineLearningVersion } from '../lib';

describe('Init tests', () => {

  it('version test', () => {
    expect(machineLearningVersion()).to.equal('0.0.1');
  });
});