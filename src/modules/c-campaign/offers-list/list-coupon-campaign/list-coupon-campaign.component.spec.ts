import { ListCouponCampaignComponent } from './list-coupon-campaign.component';
import { Observable } from 'rxjs/Rx';

describe('ListCouponCampaignComponent', () => {
    let sut;
    let offerListService;
    let mockOffers;
    let mockResult;

    beforeEach(() => {
        mockOffers = ['offer1', 'offer2'];
        mockResult = {id: 1};

        offerListService = {
            getOffers: jasmine.createSpy('getOffers').and.returnValue(Observable.of(mockOffers))
        };

        sut = new ListCouponCampaignComponent();

        sut.tableCoupon = {
            setOffers: jasmine.createSpy('setOffers')
        };

    });
});
