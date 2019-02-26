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

    getClasses(): any {
        let file = JSON.parse(JSON.stringify(this._file));
        file.shift();
        return file = file.map((item: any) => item[file[0].length - 1]);
    }

    getDistinctClasses(): any {
        return Array.from(new Set(this.getClasses()));
    }

    // getDistinctClassesAsNumbers(): number[] {
    //     let y = irisDataset.getClasses();
    //     let classes = irisDataset.getDistinctClasses();
    //
    //     let transform: any = {};
    //     for (let i = 0; i < classes.length; ++i) {
    //         transform[classes[i]] = i;
    //     }
    //
    //
    //     for (let i = 0; i < y.length; ++i) {
    //         y[i] = transform[y[i]];
    //     }
    // }

    getValues(): any {
        let file = JSON.parse(JSON.stringify(this._file));
        file.shift();
        return file.map((d: any) => d.slice(0, 4));
    }

    getLabels(): any {
        return this._file[0];
    }
}


export interface ImportFile {
    load(src: string): void;

    getAsArray(): any

    getAsJsonObjectsArray(): any;

    getClasses(): any;

    getDistinctClasses(): any;

    // getDistinctClassesAsNumbers(): number[];

    getValues(): any;

    getLabels(): any;
}