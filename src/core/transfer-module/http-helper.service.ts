import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class HttpHelperService {
    constructor() {}

    transformToQuery(params: any): URLSearchParams {
        const urlSearchParams = new URLSearchParams();

        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const value = params[key].toString();
                if (value) {
                    urlSearchParams.append(key, value);
                }
            }
        }

        return urlSearchParams;
    }

    appendMultipleField(field: string, params: object, urlSearchParams: URLSearchParams): void {
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const value = [key, params[key].toString()].join();
                if (value) {
                    urlSearchParams.append(field, value);
                }
            }
        }
    }

    transformStringToQuery(params: string): URLSearchParams {
        return new URLSearchParams(params);
    }
}
