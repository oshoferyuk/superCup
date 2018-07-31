import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams } from '@angular/http';
import { HttpService } from '../../../../../core/transfer-module/http.service';

const URLS = {
    products: '/products',
    productSummary: '/productSummary'
};

@Injectable()
export class ProductSearchService {

    constructor(private http: HttpService) {}

    searchProgram(data: any): Observable<any> {
        const params = new URLSearchParams();

        // TODO test all parameters
        if (!!data.sector && data.sector !== '') {
            params.set('sector', data.sector);
        }

        if (!!data.category && data.category !== '') {
            params.set('category', data.category);
        }

        if (!!data.brand && data.brand !== '') {
            params.set('brand', data.brand);
        }

        if (!!data.subbrand && data.subbrand !== '') {
            params.set('subbrands', data.subbrand);
        }

        if (!!data.version && data.version !== '') {
            params.set('versions', data.version);
        }

        if (!!data.form && data.form !== '') {
            params.set('forms', data.form);
        }

        if (!!data.levels && data.levels !== '') {
            params.set('levels', data.levels);
        }

        return this.http.get(URLS.products,  params);
    }

    getProductSummaries(data: any): Observable<any> { // TODO should be tested
        const params = new URLSearchParams();

        Object.keys(data)
            .forEach((selectedCategory) => {
                if (!!data[selectedCategory] && data[selectedCategory] !== '') {
                    params.set(selectedCategory, data[selectedCategory]);
                }
            });

        return this.http.get(URLS.productSummary,  params);
    }
}

