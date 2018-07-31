import { Injectable } from '@angular/core';
import { HttpService } from '../../transfer-module/http.service';
import { Observable } from 'rxjs/Observable';
import { Coupon } from '../../models/offer/coupon.model';
import { Sample } from '../../models/offer/sample.model';

@Injectable()
export class OfferService {
    private URL: string = '/offers';

    constructor(private http: HttpService) {
    }

    getOfferById(id: string): Observable<Coupon | Sample>  {
        return this.http.get(`${this.URL}/${id}`);
    }

    getOfferDuplicate(id: string): Observable<Coupon | Sample>  {
        return this.http.post(`${this.URL}/${id}/duplicate`, {});
    }
}
