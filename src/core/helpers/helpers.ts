import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Injectable()
export class Helpers {
    constructor() {}

    objectKeyTransform(array: any, form: string, to: string): any { // TODO Should be tested
        return array.map((obj) => {
            if (isNullOrUndefined(obj)) {
                return;
            }
            if (obj[form]) {
                obj[to] = obj[form];
                delete obj[form];
            }

            return obj;
        });
    }

    findByKeysInObjectArray(array: any[], objArray: object[], searchKey: string): any[] {
        const result = [];
        array.forEach((key) => {
            result.push(objArray.find(obj => obj[searchKey] === key));
        });
        return result;
    }
}
