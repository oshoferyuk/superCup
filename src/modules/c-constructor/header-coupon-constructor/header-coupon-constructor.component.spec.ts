import { HeaderCouponConstructorComponent } from './header-coupon-constructor.component';

describe('HeaderCouponConstructorComponent', () => {
    let sut;
    let Router;
    let ConsumerSegmentsService;

    let form;
    let formValue;
    let marketingProgram;
    let marketingProgram2;

    beforeEach(() => {
        Router = {
            navigate: jasmine.createSpy('navigate')
        };

        ConsumerSegmentsService = {
            getConsumerSegments: jasmine.createSpy('getConsumerSegments')
        };

        formValue = {
            type: 'offer',
            offer: {
                channelId: 2
            }
        };

        form = {
            getRawValue: jasmine.createSpy('getRawValue').and.returnValue(formValue)
        };

        marketingProgram = {
            id: 1,
            marketingProgramId: Math.random()
        };
        marketingProgram2 = {
            id: 2
        };

        sut = new HeaderCouponConstructorComponent(
            Router,
            ConsumerSegmentsService
        );

        sut.marketingPrograms = [marketingProgram, marketingProgram2];
        sut.onSetMarketingProgram = {
            emit: jasmine.createSpy('emit')
        };
        sut.form = form;
    });

    it('should navigate to campaign', () => {
        sut.navToCampaign();
        expect(Router.navigate).toHaveBeenCalledWith(['campaign']);
    });

    xdescribe('set marketing program', () => { // TODO VN Refactor form store
        beforeEach(() => {
            sut.selectedMarketingProgram = marketingProgram;
            sut.setMarketingProgram();
        });
        it('should emit selected program', () => {
            expect(sut.onSetMarketingProgram.emit).toHaveBeenCalledWith(marketingProgram);
        });

        it('should get consumer segments with selected marketing program', () => {
            expect(ConsumerSegmentsService.getConsumerSegments).toHaveBeenCalledWith(marketingProgram.marketingProgramId);
        });
    });

    describe('on init', () => {
        describe('when no channel id', () => {
            beforeEach(() => {
                formValue.offer.channelId = null;
                sut.setMarketingProgramInitial = jasmine.createSpy('setMarketingProgramInitial');
                sut.ngOnInit();
            });

            it('should have selected marketing program on scope', () => {
                expect(sut.selectedMarketingProgram).toEqual(marketingProgram);
            });

            it('should set marketing program', () => {
                expect(sut.setMarketingProgramInitial).toHaveBeenCalled();
            });
        });

        describe('when with channel id', () => {
            beforeEach(() => {
                sut.setMarketingProgramInitial = jasmine.createSpy('setMarketingProgramInitial');
            });

            describe('when no marketing program on form', () => {
                beforeEach(() => {
                    formValue.offer.channelId = null;
                    sut.ngOnInit();
                });

                it('should have selected marketing program on scope', () => {
                    expect(sut.selectedMarketingProgram).toEqual(marketingProgram);
                });

                it('should set marketing program', () => {
                    expect(sut.setMarketingProgramInitial).toHaveBeenCalled();
                });
            });

            describe('when marketing program id is on form', () => {
                beforeEach(() => {
                    formValue.offer.channelId = 2;
                    sut.ngOnInit();
                });

                it('should have selected marketing program on scope', () => {
                    expect(sut.selectedMarketingProgram).toEqual(marketingProgram2);
                });

                it('should emit selected marketing program', () => {
                    expect(sut.onSetMarketingProgram.emit).toHaveBeenCalledWith(marketingProgram2);
                });
            });

        });
    });

    describe('is marketing program disabled', () => {
        it('should be disabled if status is active', () => {
            sut.status = 'ACTIVE';
            expect(sut.isMarketingProgramDisabled()).toBeTruthy();
        });

        it('should be disabled if status is upcoming', () => {
            sut.status = 'UPCOMING';
            expect(sut.isMarketingProgramDisabled()).toBeTruthy();
        });

        it('should be disabled if status is delted', () => {
            sut.status = 'DELETED';
            expect(sut.isMarketingProgramDisabled()).toBeTruthy();
        });

        it('should be enabled if any other status', () => {
            sut.status = 'DRAFT';
            expect(sut.isMarketingProgramDisabled()).toBeFalsy();
        });
    });
});
