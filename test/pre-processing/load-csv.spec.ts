import {expect} from 'chai';
import 'mocha';
import {ImportCsv} from '../../lib/pre-processing/import-data/import-csv';
import {ImportArray} from "../../lib/pre-processing/import-data/import-array";

describe('Load csv file', () => {

    it('Load file', async () => {

        const expectedValues: string[] = ['Id', 'SepalLenCm', 'SepalWidCm', 'PetalLenCm', 'PetalWidCm', 'Species'];

        let importData = new ImportCsv();
        const data = await importData.load('iris.csv');

        expect(data[0]).to.include.members(expectedValues);
    });

    it('Get as JSON Object', async () => {

        const expectedJsonObject: Object = {
            Id: '1',
            SepalLenCm: '5.1',
            SepalWidCm: '3.5',
            PetalLenCm: '1.4',
            PetalWidCm: '0.2',
            Species: 'Iris-setosa'
        };

        let importData = new ImportCsv();
        await importData.load('iris.csv');
        const fileAsJson: any = importData.getAsJsonObjectsArray();

        expect(fileAsJson[0]).to.deep.equal(expectedJsonObject);
    });

    it('Get Distinct Classes', async () => {

        const expectedDistinctClasses: string[] = ['Iris-setosa', 'Iris-versicolor', 'Iris-virginica'];

        let importData = new ImportCsv();
        await importData.load('iris.csv');
        const distinctClasses = importData.getDistinctClasses();

        expect(distinctClasses).to.deep.equal(expectedDistinctClasses);
    });

    it('Get Values', async () => {

        const expectedValues: string[][] = [
            ['1', '5.1', '3.5', '1.4'],
            ['2', '4.9', '3', '1.4'],
            ['3', '4.7', '3.2', '1.3'],
            ['4', '4.6', '3.1', '1.5']
        ];

        let importData = new ImportCsv();
        await importData.load('iris.csv');
        const values = importData.getValues(0, 4);

        expect(values.slice(0, 4)).to.deep.equal(expectedValues);
    });

    it('Get Labels', async () => {

        const expectedLabel: string[] = ['Id', 'SepalLenCm', 'SepalWidCm', 'PetalLenCm', 'PetalWidCm', 'Species'];

        let importData = new ImportCsv();
        await importData.load('iris.csv');
        const labels = importData.getLabels();

        expect(labels).to.deep.equal(expectedLabel);
    });

    it('Get Classes', async () => {

        const expectedClasses: string[] = ['Iris-setosa', 'Iris-setosa', 'Iris-setosa'];

        let importData = new ImportCsv();
        await importData.load('iris.csv');
        const classes = importData.getClasses();

        expect(classes.slice(0, 3)).to.deep.equal(expectedClasses);
    });

    it('Get Distinct Classes as numbers #1', async () => {
        const expectedNumbers: number[] = [0, 0, 0];

        let importData = new ImportCsv();
        await importData.load('iris.csv');
        const classes = importData.getDistinctClassesAsNumbers();

        expect(classes.slice(0, 3)).to.deep.equal(expectedNumbers);
    });

    it('Get Distinct Classes as numbers #2', () => {
        const expectedNumbers: number[] = [0, 1, 2];

        let importData = new ImportArray();
        importData.load([['classes'], ['1'], ['2'], ['3']]);
        const classes = importData.getDistinctClassesAsNumbers();

        expect(classes).to.deep.equal(expectedNumbers);
    });

    it('Get Values as numbers #2', async () => {

        const dataArray = [
            ['id', 'val1', 'val2', 'result'],
            [1, 'v1', 'v2', 0],
            [2, 'v2', 'v1', 1],
            [3, 'v1', 'v3', 0],
            [4, 'v2', 'v2', 1]
        ];

        const expectedNumbers: number[][] = [[0, 0], [1, 1], [0, 2], [1, 0]];

        let importData = new ImportArray();
        await importData.load(dataArray);
        const valuesAsNumbers = importData.getValuesAsNumbers(1, 3);

        expect(valuesAsNumbers).to.deep.equal(expectedNumbers);
    });
});