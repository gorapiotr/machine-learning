import {ImportFileGeneric} from "./import-file.types";

let csv = require("fast-csv");

export class ImportCsv extends ImportFileGeneric {

    load(src: string): Promise<any[]> {

        const data: any = [];

        return new Promise((resolve) => {
            const importThis = this;
            csv.fromPath(src).on("data", function (row: any) {
                data.push(row);
            }).on("end", function () {
                importThis._file = data;
                resolve(data)
            })
        });
    }
}