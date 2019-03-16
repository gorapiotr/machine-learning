import {transpose} from "../utils/transpose";

export abstract class ImportFileGeneric implements ImportFile {

    protected _file: any = [];

    abstract load(src: string): Promise<any[]>;

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

    getDistinctClassesAsNumbers(): number[] {
        let y = this.getClasses();
        let classes = this.getDistinctClasses();

        return this.getPropertiesAsNumbers(y, classes);
    }

    private getPropertiesAsNumbers(properties: any, classes: any): number[] {
        let transform: any = {};
        for (let i = 0; i < classes.length; ++i) {
            transform[classes[i]] = i;
        }

        for (let i = 0; i < properties.length; ++i) {
            properties[i] = transform[properties[i]];
        }
        return properties;
    }

    getValues(startValue: number, endValue: number): any {
        let file = JSON.parse(JSON.stringify(this._file));
        file.shift();
        return file.map((d: any) => d.slice(startValue, endValue));
    }

    getValuesAsNumbers(startValue: number, endValue: number) {
        let values = this.getValues(startValue, endValue);
        values = transpose(values);
        const prop = values.map( (row: any) => Array.from(new Set(row)));
        return transpose(values.map( (item:any, index: number) => this.getPropertiesAsNumbers(item, prop[index])));
    }

    getLabels(): any {
        return this._file[0];
    }

    set file(file: any) {
        this._file = file;
    }
}


export interface ImportFile {
    load(src: string): Promise<any[]> | any;

    getAsArray(): any

    getAsJsonObjectsArray(): any;

    getClasses(): any;

    getDistinctClasses(): any;

    getDistinctClassesAsNumbers(): number[];

    getValues(startValue: number, endValue: number): any;

    getLabels(): any;
}