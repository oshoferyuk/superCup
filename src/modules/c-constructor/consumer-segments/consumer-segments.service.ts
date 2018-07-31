import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { HttpService } from '../../../core/transfer-module/http.service';

import { Observable } from 'rxjs/Observable';
import { ConsumerSegmentsStore } from './consumer-segments.store';

export const consumerSegmentsSearchParams = {
    channelId: 'channelId'
};

@Injectable()
export class ConsumerSegmentsService {  // TODO Should be tested

    private URL: string = '/consumerSegments';

    constructor(
        private httpService: HttpService,
        private consumerSegmentsStore: ConsumerSegmentsStore
    ) { }

    getConsumerSegments(channelId: string): Observable<any> {
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.set(consumerSegmentsSearchParams.channelId, channelId);
        const observable =  this.httpService.get(this.URL, urlSearchParams);

        observable.share();
        observable.subscribe(result => this.consumerSegmentsStore.update(result));
        return observable;
    }
}
