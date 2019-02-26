export abstract class ImportFileGeneric implements ImportFile {

    protected _file: any = [];

    abstract load(src: string): void;

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

    getDistinctClasses(): any {
        let file = JSON.parse(JSON.stringify(this._file));
        file.shift();
        file = file.map((item: any) => item[file[0].length - 1]);
        return Array.from(new Set(file));
    }

    getValues(): any {
        let file = JSON.parse(JSON.stringify(this._file));
        file.shift();
        return file.map((d: any) => d.slice(0, 4));
    }
}


export interface ImportFile {
    load(src: string): void;

    getAsArray(): any

    getAsJsonObjectsArray(): any;

    getDistinctClasses(): any;

    getValues(): any;
}