import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { mainRouting } from '../../main/main-routing.constants';

@Component({
    selector: 'fp-header-coupon-campaign',
    templateUrl: './header-coupon-campaign.component.html',
    styleUrls: ['./header-coupon-campaign.component.scss']
})
export class HeaderCouponCampaignComponent {

    constructor(private router: Router) {
    }

    navToConstructor(): void {
        this.router.navigate([mainRouting.constructor]);
    }

}
