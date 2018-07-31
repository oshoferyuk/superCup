import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/transfer-module/http.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class SampleValuesService {  // TODO Should be tested

    private URL: string = '/samplePartTypes';

    constructor(
        private httpService: HttpService
    ) { }

    getSampleValues(): Observable<any> {
        return this.httpService.get(this.URL);
    }
}
