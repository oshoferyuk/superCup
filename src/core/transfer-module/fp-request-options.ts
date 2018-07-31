import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class FpRequestOptions extends BaseRequestOptions {

    static resolveApiUrl(url: string): string {
        const backendUrl = environment.backendUrl
            ? environment.backendUrl
            : location.port
                ? location.origin.replace(location.port, '9001')
                : location.origin;

        return url.includes('http')
            ? url
            : `${backendUrl}/oms-ui${url}`;
    }

    constructor() {
        super();
        this.headers.set('Content-Type', 'application/json');
        this.headers.set('X-Requested-With', 'XMLHttpRequest');
    }

    public merge(options: RequestOptionsArgs): RequestOptions {
        return super.merge(Object.assign({}, options, {
            url: options.url && FpRequestOptions.resolveApiUrl(options.url)
        }));
    }
}
