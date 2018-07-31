import { Component, ViewChild } from '@angular/core';
import { Offer } from '../models/offer.model';
import { TableCouponCampaignComponent } from '../table-coupon-campaign/table-coupon-campaign.component';

@Component({
    selector: 'fp-list-coupon-campaign',
    templateUrl: './list-coupon-campaign.component.html',
    styleUrls: ['./list-coupon-campaign.component.scss']
})
export class ListCouponCampaignComponent {
    isExpanded: boolean;

    constructor() {}

    toggleShowFilters(isExpanded: boolean): void {
        this.isExpanded = isExpanded;
    }
}

