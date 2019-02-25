import Matrix from 'ml-matrix';
let Stat = require('ml-stat');

import { separateClasses } from './utils/separate-classes'

export class GaussianNaiveBayes {

    private means: any;
    private calculateProbabilities: any; 

  constructor(reload?: any, model?:any ) {
    if (reload) {
      this.means = model.means;
      this.calculateProbabilities = model.calculateProbabilities;
    }
  }

  train(trainingSet: any, trainingLabels: any) {
    var C1 = Math.sqrt(2 * Math.PI); // constant to precalculate the squared root
    trainingSet = Matrix.checkMatrix(trainingSet);

    if (trainingSet.rows !== trainingLabels.length) {
      throw new RangeError(
        'the size of the training set and the training labels must be the same.'
      );
    }

    var separatedClasses = separateClasses(trainingSet, trainingLabels);
    var calculateProbabilities = new Array(separatedClasses.length);
    this.means = new Array(separatedClasses.length);
    for (var i = 0; i < separatedClasses.length; ++i) {
      var means = Stat.matrix.mean(separatedClasses[i]);
      var std = Stat.matrix.standardDeviation(separatedClasses[i], means);

      var logPriorProbability = Math.log(
        separatedClasses[i].rows / trainingSet.rows
      );
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
  }

  predict(dataset: any) {
    if (dataset[0].length === this.calculateProbabilities[0].length) {
      throw new RangeError(
        'the dataset must have the same features as the training set'
      );
    }

    var predictions = new Array(dataset.length);

    for (var i = 0; i < predictions.length; ++i) {
      predictions[i] = getCurrentClass(
        dataset[i],
        this.means,
        this.calculateProbabilities
      );
    }

    return predictions;
  }

  toJSON() {
    return {
      modelName: 'NaiveBayes',
      means: this.means,
      calculateProbabilities: this.calculateProbabilities
    };
  }

  static load(model: any) {
    if (model.modelName !== 'NaiveBayes') {
      throw new RangeError(`The current model is not a Multinomial Naive Bayes, current model:', ${model.name}`);
    }

    return new GaussianNaiveBayes(true, model);
  }
}

function getCurrentClass(currentCase: any, mean: any, classes:any) {
    var maxProbability = 0;
    var predictedClass = -1;
  
    // going through all precalculated values for the classes
    for (var i = 0; i < classes.length; ++i) {
      var currentProbability = classes[i][0]; // initialize with the prior probability
      for (var j = 1; j < classes[0][1].length + 1; ++j) {
        currentProbability += calculateLogProbability(
          currentCase[j - 1],
          mean[i][j - 1],
          classes[i][j][0],
          classes[i][j][1]
        );
      }
  
      currentProbability = Math.exp(currentProbability);
      if (currentProbability > maxProbability) {
        maxProbability = currentProbability;
        predictedClass = i;
      }
    }
  
    return predictedClass;
  }

  function calculateLogProbability(value: any, mean: any, C1: any, C2: any) {
    value = value - mean;
    return Math.log(C1 * Math.exp(value * value / C2));
  }