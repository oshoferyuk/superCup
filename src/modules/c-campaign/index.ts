import { ContainerCouponCampaignComponent } from './container-coupon-campaign/container-coupon-campaign.component';
import { HeaderCouponCampaignComponent } from './header-coupon-campaign/header-coupon-campaign.component';

import { offerListComponents } from './offers-list';

export const couponCampaignComponents = [
    ContainerCouponCampaignComponent,
    HeaderCouponCampaignComponent,
    ...offerListComponents
];
