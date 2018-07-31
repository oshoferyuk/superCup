import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../../core/transfer-module/http.service';

@Injectable()
export class MarketingProgramService {
    private URL: string = '/channels';

    constructor(
        private httpService: HttpService
    ) { }

    getMarketingProgram(): Observable<any> {
        return this.httpService.get(this.URL);
    }
}
