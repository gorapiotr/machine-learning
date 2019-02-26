import {expect} from 'chai';
import 'mocha';
import {GaussianNaiveBayes} from '../../lib/naive-bayes/gaussian-naive-bayes';

let irisDataset = require('ml-dataset-iris');
let Random = require('random-js');

let r = new Random(Random.engines.mt19937().seed(42));
let X = irisDataset.getNumbers();
let y = irisDataset.getClasses();
let classes = irisDataset.getDistinctClasses();

let transform: any = {};
for (let i = 0; i < classes.length; ++i) {
    transform[classes[i]] = i;
}


for (let i = 0; i < y.length; ++i) {
    y[i] = transform[y[i]];
}

shuffle(X, y);
const Xtrain = X.slice(0, 110);
const ytrain = y.slice(0, 110);
const Xtest = X.slice(110);
const ytest = y.slice(110);

describe('Test with iris datasets', () => {

    it('Gaussian naive bayes', () => {
        const gnb = new GaussianNaiveBayes();
        gnb.train(Xtrain, ytrain);
        const prediction = gnb.predict(Xtest);
        const acc = accuracy(prediction, ytest);

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
    const len = arr1.length;
    let total = 0;
    for (let i = 0; i < len; ++i) {
        if (arr1[i] === arr2[i]) {
            total++;
        }
    }
    return total / len;
}