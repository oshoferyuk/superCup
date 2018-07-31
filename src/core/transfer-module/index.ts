import { Http, RequestOptions } from '@angular/http';

import { HttpService } from './http.service';
import { HttpHelperService } from './http-helper.service';
import { FpHttp } from './fp-http';
import { FpRequestOptions } from './fp-request-options';

export const transferServices = [
    HttpService,
    HttpHelperService,
    { provide: RequestOptions, useClass: FpRequestOptions },
    { provide: Http, useClass: FpHttp }
];
