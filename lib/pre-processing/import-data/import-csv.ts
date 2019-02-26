import {ImportFile} from "./import-file.types";

let csv = require("fast-csv");

export class ImportCsv implements ImportFile {

    private _file: any = [];

    load(src: string): Promise<any[]> {

        const data: any = [];

        return new Promise((resolve) => {
            const importThis = this;

            csv.fromPath(src)
                .on("data", function (row: any) {
                    data.push(row);
                })
                .on("end", function () {
                    importThis._file = data;
                    resolve(data)
                })
        });
    }


    getAsArray(): any {
        if (this._file) {
            return this._file;
        }
    }

    getAsJsonObjectsArray(): any {
        if (this._file) {
            let file = JSON.parse(JSON.stringify(this._file));
            const keys = file.slice(0, 1)[0];
            file.shift();
            file = file.map((item: any) => {
                let itemObj: any = {};
                item.forEach((element: any, index: number) => {
                    itemObj[keys[index]] = element;
                });
                return itemObj;
            });
            return file;
        }
    }
}