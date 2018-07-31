import { Injectable } from '@angular/core';
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FpHttp extends Http {

    constructor(private backend: XHRBackend,
                private defaultOptions: RequestOptions,
                private router: Router) {
        super(backend, defaultOptions);
    }

    // TODO VN should be tested
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options).catch((error: Response) => {
            if ((error.status === 401 || error.status === 403)) {
                this.router.navigate(['login']);
            }
            return Observable.throw(error);
        });
    }
}

