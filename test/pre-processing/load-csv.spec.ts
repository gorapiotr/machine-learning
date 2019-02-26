import {expect} from 'chai';
import 'mocha';
import {ImportCsv} from '../../lib/pre-processing/import-data/import-csv';

describe('Load csv file', () => {

    it('Load file', async () => {

        const value: string[] = ['Id', 'SepalLenCm', 'SepalWidCm', 'PetalLenCm', 'PetalWidCm', 'Species'];


        let importData = new ImportCsv();
        const data = await importData.load('iris.csv');

        expect(data[0]).to.include.members(value);
    });
});