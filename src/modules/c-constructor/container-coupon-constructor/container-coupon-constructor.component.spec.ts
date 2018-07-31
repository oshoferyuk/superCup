import { ContainerCouponConstructorComponent } from './container-coupon-constructor.component';

describe('ContainerCouponConstructorComponent', () => {
    let sut;
    let ActivatedRoute;
    let OfferFormService;
    let OfferStore;
    let couponConstructor;
    let MarketingProgramStore;
    let ProductSelectorService;

    const sampleValues = Symbol('sampleValues');
    const marketingPrograms = Symbol('marketingPrograms');
    const offer = {
        type: 'TYPE'
    };
    const value = Symbol('value');
    const formOffer = {
        get: jasmine.createSpy('get').and.returnValue({value})
    };

    beforeEach(() => {
        couponConstructor = {
            offerInfoForm: {eanNumber: '123'}
        };

        ActivatedRoute = {
            snapshot: {
                data: {
                    couponConstructor: {
                        sampleValues,
                        marketingPrograms,
                        offer
                    }
                }
            }
        };

        OfferFormService = {
            createForm: jasmine.createSpy('createForm').and.returnValue(formOffer),
            updateForm: jasmine.createSpy('updateForm')
        };

        OfferStore = {
            setFormForUpdates: jasmine.createSpy('setFormForUpdates')
        };

        MarketingProgramStore = {
            setMarketingPrograms: jasmine.createSpy('setMarketingPrograms'),
            setSelectedMarketingProgram: jasmine.createSpy('setSelectedMarketingProgram')
        };

        ProductSelectorService = {
            resetData: jasmine.createSpy('resetData'),
            setProductSummaries: jasmine.createSpy('setProductSummaries'),
        };

        sut = new ContainerCouponConstructorComponent(
            ActivatedRoute,
            OfferFormService,
            OfferStore,
            MarketingProgramStore,
            ProductSelectorService);
    });

    describe('on init', () => {
        beforeEach(() => {
            sut.ngOnInit();
        });

        it('should resolve marketing program', () => {
            expect(sut.marketingPrograms).toEqual(marketingPrograms);
        });

        it('should resolve marketing program', () => {
            expect(sut.sampleValues).toEqual(sampleValues);
        });

        it('should call setMarketingPrograms method', () => {
            expect(MarketingProgramStore.setMarketingPrograms).toHaveBeenCalledWith(marketingPrograms);
        });

        it('should attach created offer form on scope', () => {
            expect(sut.formOffer).toEqual(formOffer);
        });

        it('should get status from from', () => {
            expect(sut.getStatus()).toEqual(value);
        });

        it('should set form for future updates', () => {
            expect(OfferStore.setFormForUpdates).toHaveBeenCalledWith(formOffer);
        });

        it('should update form with offer', () => {
            expect(OfferFormService.updateForm).toHaveBeenCalledWith(offer, sut.formOffer);
        });

        it('should define timestamp', () => {
            expect(sut.timeStamp).toBeDefined();
        });
    });

    describe('set marketing program', () => {
        it('should select marketing program', () => {
            sut.setMarketingProgram(marketingPrograms);
            expect(sut.selectedMarketingProgram).toEqual(marketingPrograms);
        });
        it('should select marketing program in service', () => {
            sut.setMarketingProgram(marketingPrograms);
            expect(sut.marketingProgramStore.setSelectedMarketingProgram).toHaveBeenCalledWith(marketingPrograms);
        });
    });
});
