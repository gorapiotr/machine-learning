"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var gaussian_naive_bayes_1 = require("../../lib/naive-bayes/gaussian-naive-bayes");
var irisDataset = require('ml-dataset-iris');
var Random = require('random-js');
var r = new Random(Random.engines.mt19937().seed(42));
var X = irisDataset.getNumbers();
var y = irisDataset.getClasses();
var classes = irisDataset.getDistinctClasses();
var transform = {};
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
describe('Test with iris datasets', function () {
    it('Gaussian naive bayes', function () {
        var gnb = new gaussian_naive_bayes_1.GaussianNaiveBayes();
        gnb.train(Xtrain, ytrain);
        var prediction = gnb.predict(Xtest);
        var acc = accuracy(prediction, ytest);
        chai_1.expect(acc).to.be.above(0.8);
    });
});
function shuffle(X, y) {
    for (var i_1 = X.length; i_1; i_1--) {
        var j = Math.floor(r.real(0, 1) * i_1);
        _a = [X[j], X[i_1 - 1]], X[i_1 - 1] = _a[0], X[j] = _a[1];
        _b = [y[j], y[i_1 - 1]], y[i_1 - 1] = _b[0], y[j] = _b[1];
    }
    var _a, _b;
}
function accuracy(arr1, arr2) {
    var len = arr1.length;
    var total = 0;
    for (var i = 0; i < len; ++i) {
        if (arr1[i] === arr2[i]) {
            total++;
        }
    }
    return total / len;
}
