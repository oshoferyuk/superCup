import { Injectable } from '@angular/core';

import { BaseStore } from '../../../core/storage/base.store';
import { ConsumerSegments } from '../../../core/models/consumer-segments.model';

@Injectable()
export class ConsumerSegmentsStore extends BaseStore<ConsumerSegments[]> {
    constructor() {
        const consumerSegments = new ConsumerSegments();
        super([consumerSegments]);
    }
}
