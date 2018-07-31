import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { ConsumerSegmentsService } from './consumer-segments/consumer-segments.service';
import { MarketingProgramService } from './services/marketing-program.service';

import { SampleValuesService } from './services/sample-values-service';
import { OfferService } from '../../core/services/offer/offer.service';

@Injectable()
export class CouponConstructorResolver implements Resolve<any> {  // TODO Should be tested
    constructor(
        private sampleValuesService: SampleValuesService,
        private consumerSegmentsService: ConsumerSegmentsService,
        private marketingProgramService: MarketingProgramService,
        private offerService: OfferService,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        const sampleValues = this.sampleValuesService.getSampleValues();
        const marketingProgram = this.marketingProgramService.getMarketingProgram();
        const result = {
            sampleValues: null,
            marketingPrograms: null,
            offer: null
        };

        return Observable.forkJoin([sampleValues, marketingProgram])
            .map((results) => {
                result.sampleValues = results[0];
                result.marketingPrograms = results[1];
            })
            .mergeMap(() => {
                const offerId = route.params['id'];
                if (offerId) {
                    return this.offerService.getOfferById(offerId);
                }
                return Observable.of(false);
            })
            .do((offer) => {
                if (offer) {
                    result.offer = offer;
                }
            })
            .mergeMap(() => {
                const marketingProgramId = result.offer && result.offer.channelId || result.marketingPrograms[0].id;
                return this.consumerSegmentsService.getConsumerSegments(marketingProgramId);
            })
            .map(() => (result));
    }
}
