import {ImportFileGeneric} from "./import-file.types";

export class ImportArray extends ImportFileGeneric {

    load(array: any): any {
        this._file = array;
    }
}