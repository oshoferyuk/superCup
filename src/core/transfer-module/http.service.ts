import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { ProgressSpinnerService } from '../progress-spinner/progress-spinner.service';

@Injectable()
export class HttpService {

    public static onResponseSuccess(data: any): any {
        return data.json();
    }

    public static onResponseFail(data: any): any { // TODO VN tbt
        return Observable.throw(data.json());
    }

    constructor(
        private http: Http,
        private defaultOptions: RequestOptions,
        private progressSpinnerService: ProgressSpinnerService,
    ) {
    }

    get(url: string, search?: URLSearchParams): Observable<any> {
        this.progressSpinnerService.show();

        return this.http
            .get(url, this.defaultOptions.merge({ url, search }))
            .catch(HttpService.onResponseFail)
            .finally(() => this.progressSpinnerService.hide())
            .map(HttpService.onResponseSuccess)
            .share();
    }

    post(url: string, body: object, search?: URLSearchParams): Observable<any> {
        this.progressSpinnerService.show();

        return this.http
            .post(url, body, this.defaultOptions.merge({ url, search }))
            .catch(HttpService.onResponseFail)
            .finally(() => this.progressSpinnerService.hide())
            .map(HttpService.onResponseSuccess)
            .share();
    }

    put(url: string, body: object, search?: URLSearchParams): Observable<any> {
        this.progressSpinnerService.show();

        return this.http
            .put(url, body, this.defaultOptions.merge({ url, search }))
            .catch(HttpService.onResponseFail)
            .finally(() => this.progressSpinnerService.hide())
            .map(HttpService.onResponseSuccess)
            .share();
    }

    delete(url: string, search?: URLSearchParams): Observable<any> {
        this.progressSpinnerService.show();

        return this.http
            .delete(url, this.defaultOptions.merge({ url, search }))
            .catch(HttpService.onResponseFail)
            .finally(() => this.progressSpinnerService.hide())
            .map(HttpService.onResponseSuccess)
            .share();
    }

    setAuthHeader(token: string): void {
        this.defaultOptions.headers.set('Authorization', token);
    }

    removeAuthHeader(): void {
        this.defaultOptions.headers.delete('Authorization');
    }
}
