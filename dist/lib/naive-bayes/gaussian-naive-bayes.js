"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ml_matrix_1 = __importDefault(require("ml-matrix"));
var Stat = require('ml-stat');
var separate_classes_1 = require("./utils/separate-classes");
var GaussianNaiveBayes = /** @class */ (function () {
    function GaussianNaiveBayes(reload, model) {
        if (reload) {
            this.means = model.means;
            this.calculateProbabilities = model.calculateProbabilities;
        }
    }
    GaussianNaiveBayes.prototype.train = function (trainingSet, trainingLabels) {
        var C1 = Math.sqrt(2 * Math.PI); // constant to precalculate the squared root
        trainingSet = ml_matrix_1.default.checkMatrix(trainingSet);
        if (trainingSet.rows !== trainingLabels.length) {
            throw new RangeError('the size of the training set and the training labels must be the same.');
        }
        var separatedClasses = separate_classes_1.separateClasses(trainingSet, trainingLabels);
        var calculateProbabilities = new Array(separatedClasses.length);
        this.means = new Array(separatedClasses.length);
        for (var i = 0; i < separatedClasses.length; ++i) {
            var means = Stat.matrix.mean(separatedClasses[i]);
            var std = Stat.matrix.standardDeviation(separatedClasses[i], means);
            var logPriorProbability = Math.log(separatedClasses[i].rows / trainingSet.rows);
            calculateProbabilities[i] = new Array(means.length + 1);
            calculateProbabilities[i][0] = logPriorProbability;
            for (var j = 1; j < means.length + 1; ++j) {
                var currentStd = std[j - 1];
                calculateProbabilities[i][j] = [
                    1 / (C1 * currentStd),
                    -2 * currentStd * currentStd
                ];
            }
            this.means[i] = means;
        }
        this.calculateProbabilities = calculateProbabilities;
    };
    GaussianNaiveBayes.prototype.predict = function (dataset) {
        if (dataset[0].length === this.calculateProbabilities[0].length) {
            throw new RangeError('the dataset must have the same features as the training set');
        }
        var predictions = new Array(dataset.length);
        for (var i = 0; i < predictions.length; ++i) {
            predictions[i] = getCurrentClass(dataset[i], this.means, this.calculateProbabilities);
        }
        return predictions;
    };
    GaussianNaiveBayes.prototype.toJSON = function () {
        return {
            modelName: 'NaiveBayes',
            means: this.means,
            calculateProbabilities: this.calculateProbabilities
        };
    };
    GaussianNaiveBayes.load = function (model) {
        if (model.modelName !== 'NaiveBayes') {
            throw new RangeError("The current model is not a Multinomial Naive Bayes, current model:', " + model.name);
        }
        return new GaussianNaiveBayes(true, model);
    };
    return GaussianNaiveBayes;
}());
exports.GaussianNaiveBayes = GaussianNaiveBayes;
function getCurrentClass(currentCase, mean, classes) {
    var maxProbability = 0;
    var predictedClass = -1;
    // going through all precalculated values for the classes
    for (var i = 0; i < classes.length; ++i) {
        var currentProbability = classes[i][0]; // initialize with the prior probability
        for (var j = 1; j < classes[0][1].length + 1; ++j) {
            currentProbability += calculateLogProbability(currentCase[j - 1], mean[i][j - 1], classes[i][j][0], classes[i][j][1]);
        }
        currentProbability = Math.exp(currentProbability);
        if (currentProbability > maxProbability) {
            maxProbability = currentProbability;
            predictedClass = i;
        }
    }
    return predictedClass;
}
function calculateLogProbability(value, mean, C1, C2) {
    value = value - mean;
    return Math.log(C1 * Math.exp(value * value / C2));
}
