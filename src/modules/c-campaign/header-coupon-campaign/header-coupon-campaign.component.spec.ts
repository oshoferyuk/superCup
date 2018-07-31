import { HeaderCouponCampaignComponent } from './header-coupon-campaign.component';

describe('HeaderCouponCampaignComponent', () => {
    let sut;
    let Router;

    beforeEach(() => {
        Router = {
            navigate: jasmine.createSpy('navigate')
        };
        sut = new HeaderCouponCampaignComponent(Router);
    });

    it('should navigate to constructor', () => {
        sut.navToConstructor();
        expect(Router.navigate).toHaveBeenCalledWith(['constructor']);
    });
});
