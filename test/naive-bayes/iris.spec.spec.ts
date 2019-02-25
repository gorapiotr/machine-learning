import { expect } from 'chai';
import 'mocha';
import { GaussianNaiveBayes } from '../../lib/naive-bayes/gaussian-naive-bayes';

let irisDataset = require('ml-dataset-iris');
let Random = require('random-js');

let r = new Random(Random.engines.mt19937().seed(42));
let X = irisDataset.getNumbers();
let y = irisDataset.getClasses();
let classes = irisDataset.getDistinctClasses();

let transform:any = {};
for (var i = 0; i < classes.length; ++i) {
  transform[classes[i]] = i;
}

for (i = 0; i < y.length; ++i) {
  y[i] = transform[y[i]];
}

shuffle(X, y);
var Xtrain = X.slice(0, 110);
var ytrain = y.slice(0, 110);
var Xtest = X.slice(110);
var ytest = y.slice(110);

describe('Test with iris datasets', () => {

  it('Gaussian naive bayes', () => {
    var gnb = new GaussianNaiveBayes();
    gnb.train(Xtrain, ytrain);
    var prediction = gnb.predict(Xtest);
    var acc = accuracy(prediction, ytest);
    
    expect(acc).to.be.above(0.8);
  });
});

function shuffle(X: any, y: any) {
    for (let i = X.length; i; i--) {
      let j = Math.floor(r.real(0, 1) * i);
      [X[i - 1], X[j]] = [X[j], X[i - 1]];
      [y[i - 1], y[j]] = [y[j], y[i - 1]];
    }
}
  
function accuracy(arr1: any, arr2: any) {
var len = arr1.length;
var total = 0;
for (var i = 0; i < len; ++i) {
    if (arr1[i] === arr2[i]) {
    total++;
    }
}

return total / len;
}