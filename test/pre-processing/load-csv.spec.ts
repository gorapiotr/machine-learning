import {expect} from 'chai';
import 'mocha';
import {ImportCsv} from '../../lib/pre-processing/import-data/import-csv';

describe('Load csv file', () => {

    it('Load file', async () => {

        const expectedValues: string[] = ['Id', 'SepalLenCm', 'SepalWidCm', 'PetalLenCm', 'PetalWidCm', 'Species'];


        let importData = new ImportCsv();
        const data = await importData.load('iris.csv');

        expect(data[0]).to.include.members(expectedValues);
    });

    it('Get as JSON Object', async () => {

        const expectedJsonObject = {
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
});