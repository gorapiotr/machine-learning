import {ImportFile} from "./import-file.types";

let csv = require("fast-csv");

export class ImportCsv implements ImportFile {
    load(src: string): Promise<any[]> {

        const data: any = [];

        return new Promise((resolve) => {
            csv
                .fromPath(src)
                .on("data", function (row: any) {
                    data.push(row);
                })
                .on("end", function () {
                    resolve(data)
                })
        });
    }
}