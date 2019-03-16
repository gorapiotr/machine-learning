import {expect} from 'chai';
import 'mocha';
import {GaussianNaiveBayes} from '../../lib/naive-bayes/gaussian-naive-bayes';
import {accuracy, shuffle, transform} from "../utils";
import {ImportCsv} from "../../lib/pre-processing/import-data/import-csv";

let irisDataset = require('ml-dataset-iris');
let Random = require('random-js');


describe('Test with iris datasets', () => {

    it('Gaussian naive bayes from: ml-dataset-iris', () => {

        let r = new Random(Random.engines.mt19937().seed(42));
        let X = irisDataset.getNumbers();
        let y = irisDataset.getClasses();
        let classes = irisDataset.getDistinctClasses();

        y = transform(classes, y);

        [X, y] = shuffle(X, y, r);

        const Xtrain = X.slice(0, 110);
        const ytrain = y.slice(0, 110);
        const Xtest = X.slice(110);
        const ytest = y.slice(110);

        const gnb = new GaussianNaiveBayes();
        gnb.train(Xtrain, ytrain);
        const prediction = gnb.predict(Xtest);
        const acc = accuracy(prediction, ytest);

        expect(acc).to.be.above(0.8);
    });

    it('Gaussian naive bayes from: CSV', async () => {
        let r = new Random(Random.engines.mt19937().seed(42));
        let importData = new ImportCsv();
        const data = await importData.load('iris.csv');
        let X = importData.getValues(1, 5);
        let y = importData.getClasses();
        let classes = importData.getDistinctClasses();

        console.log(X);

        y = transform(classes, y);

        [X, y] = shuffle(X, y, r);

        const Xtrain = X.slice(0, 110);
        const ytrain = y.slice(0, 110);
        const Xtest = X.slice(110);
        const ytest = y.slice(110);

        const gnb = new GaussianNaiveBayes();
        gnb.train(Xtrain, ytrain);
        const prediction = gnb.predict(Xtest);
        const acc = accuracy(prediction, ytest);


        expect(acc).to.be.above(0.8);
    });
});