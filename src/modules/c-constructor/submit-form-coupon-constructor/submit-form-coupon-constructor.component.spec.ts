import { SubmitFormCouponConstructorComponent } from './submit-form-coupon-constructor.component';
import { Observable } from 'rxjs/Observable';
import { fakeAsync, tick } from '@angular/core/testing';
import { mainRouting } from '../../main/main-routing.constants';

describe('SubmitFormCouponConstructorComponent', () => {
    let sut;
    let SubmitFormOfferService;
    let OfferFormService;
    let ChangeDetectorRef;
    let MarketingProgramStore;
    let Router;
    let FormHelpers;

    let offer;
    let id;
    let status;

    let response;
    let marketingProgram;
    let parsedDates;
    let timeZone;

    beforeEach(() => {
        response = {
            id: Symbol('id'),
            status: Symbol('status')
        };

        marketingProgram = Symbol('marketingProgram');

        parsedDates = {
            validityStart: "2017-08-12T00:00:00.000+03:00",
            validityEnd: "2017-08-12T23:59:59.999+03:00",
            fixedExpiration: "2017-08-12T23:59:59.999+03:00"
        };

        timeZone = '+03:00';

        SubmitFormOfferService = {
            submitOffer: jasmine.createSpy('submitOffer').and.returnValue(Observable.of(response)),
            publishOffer: jasmine.createSpy('publishOffer').and.returnValue(Observable.of(response)),
            disableOffer: jasmine.createSpy('disableOffer').and.returnValue(Observable.of(response)),
            deleteOffer: jasmine.createSpy('deleteOffer').and.returnValue(Observable.of(response)),
            showDeleteDialog: jasmine.createSpy('deleteOffer'),
        };

        OfferFormService = {
            convertResponseToForm: jasmine.createSpy('convertResponseToForm')
        };

        ChangeDetectorRef = {
            markForCheck: jasmine.createSpy('markForCheck')
        };

        MarketingProgramStore = {
            getId: jasmine.createSpy('getId').and.returnValue(marketingProgram),
            getTimezone: jasmine.createSpy('getTimezone').and.returnValue(timeZone)
        };

        Router = {
            navigate: jasmine.createSpy('navigate')
        };

        FormHelpers = {
            markAllTouched: jasmine.createSpy('markAllTouched')
        };

        sut = new SubmitFormCouponConstructorComponent(
            SubmitFormOfferService,
            OfferFormService,
            MarketingProgramStore,
            ChangeDetectorRef,
            Router,
            FormHelpers,
        );

        id = {
            setValue: jasmine.createSpy('idSetValue'),
            value: Symbol('id')
        };

        status = {
            setValue: jasmine.createSpy('statusSetValue')
        };

        offer = {
            id,
            status,
            channelId: marketingProgram,
            type: 'offer',
            get: jasmine.createSpy('sampleGet').and.callFake(field => offer[field]),
            samplePartTypeCode: null,
            validityStart: {
                formatted: "2017-08-12"
            },
            validityEnd: {
                formatted: "2017-08-12"
            },
            fixedExpiration: {
                formatted: "2017-08-12"
            },
            estimatedRedemptionRate: '0.2  '
        };

        sut.form = {
            valueChanges: Observable.timer(1).map(() => true),
            value: {
                id,
                status
            },
            get: jasmine.createSpy('get').and.callFake(type => {
                if (type == 'id') {
                    return id;
                }
                return offer;
            }),
            getRawValue: jasmine.createSpy('getRawValue').and.returnValue({
                type: 'offer',
                offer,
                status
            }),
            markAsTouched: jasmine.createSpy('markAsTouched')
        };
    });

    it('should get status', () => {
        expect(sut.getStatus()).toEqual(status);
    });

    it('should contain correct timeStampFormat format', () => {
        expect(sut.timeStampFormat).toEqual('YYYY-MM-DD hh:mm:ss A');
    });

    describe('on init', () => {
        it('should call for check changes if value is changed', fakeAsync(() => {
            sut.ngOnInit();
            expect(ChangeDetectorRef.markForCheck).not.toHaveBeenCalled();
            tick(1);
            expect(ChangeDetectorRef.markForCheck).toHaveBeenCalled();
        }));
    });

    describe('save draft', () => {

        beforeEach(() => {
            sut.saveDraft();
        });

        it('should submit offer with form group', () => {
            expect(SubmitFormOfferService.submitOffer)
                .toHaveBeenCalledWith(Object.assign(offer, parsedDates, {
                    estimatedRedemptionRate: '0.2'
                }));
        });

        it('should delegate response for convertation to form', () => {
            expect(OfferFormService.convertResponseToForm).toHaveBeenCalledWith(response, 'offer');
        });

        it('should define timestamp', () => {
            expect(sut.timeStamp).toBeDefined();
        });
    });

    describe('publish offer', () => {
        beforeEach(() => {
            sut.getType = jasmine.createSpy('getType').and.returnValue('offer');
        });

        describe('when status VALID', () => {
            beforeEach(() => {
                offer.status = 'VALID';
                sut.publishOffer();
            });

            it('should publish offer with form group', () => {
                expect(SubmitFormOfferService.publishOffer)
                    .toHaveBeenCalledWith(Object.assign(offer, parsedDates, {
                        estimatedRedemptionRate: '0.2'
                    }));
            });

            it('should redirect to landing page', () => {
                expect(Router.navigate).toHaveBeenCalledWith(['campaign']);
            });
        });

        describe('when status INVALID', () => {
            beforeEach(() => {
                offer.status = 'INVALID';
                sut.publishOffer();
            });

            it('should make form submitted', () => {
                expect(sut.form.submitted).toBeTruthy();
            });

            it('should make form touched', () => {
                expect(FormHelpers.markAllTouched).toHaveBeenCalled();
            });
        });
    });

    describe('disable offer', () => {

        beforeEach(() => {
            sut.disableOffer();
        });

        it('should disable offer', () => {
            expect(SubmitFormOfferService.disableOffer)
                .toHaveBeenCalledWith(Object.assign(offer, parsedDates, {
                    estimatedRedemptionRate: '0.2'
                }));
        });

        it('should delegate response for convertation to form', () => {
            expect(OfferFormService.convertResponseToForm).toHaveBeenCalledWith(response, 'offer');
        });

        it('should define timestamp', () => {
            expect(sut.timeStamp).toBeDefined();
        });
    });

    describe('delete offer', () => {

        beforeEach(() => {
            SubmitFormOfferService.showDeleteDialog.and.returnValue(Observable.of(1));
        });

        it('should show delete dialog', () => {
            sut.deleteOffer();
            expect(SubmitFormOfferService.showDeleteDialog).toHaveBeenCalled();
        });

        describe('when dialog rejected', () => {
            beforeEach(() => {
                SubmitFormOfferService.showDeleteDialog.and.returnValue(Observable.of());
                sut.deleteOffer();
            });

            it('should not delete offer', () => {
                expect(SubmitFormOfferService.deleteOffer).not.toHaveBeenCalled();
            });

            it('should not redirect to landing page', () => {
                expect(Router.navigate).not.toHaveBeenCalled();
            });
        });

        describe('when dialog resolved', () => {
            beforeEach(() => {
                SubmitFormOfferService.showDeleteDialog.and.returnValue(Observable.of(1));
                sut.deleteOffer();
            });

            it('should delete offer', () => {
                expect(SubmitFormOfferService.deleteOffer).toHaveBeenCalledWith(Object.assign(offer, parsedDates, {
                    estimatedRedemptionRate: '0.2'
                }));
            });

            it('should redirect to landing page', () => {
                expect(Router.navigate).toHaveBeenCalledWith([mainRouting.campaign]);
            });
        });
    });

    describe('disabled', () => {
        beforeEach(() => {
            sut.getStatus = jasmine.createSpy('getStatus');
        });

        // TODO VN FIX
        xdescribe('is publish disabled', () => {
            const badStatuses = [
                'DATA_NEEDED',
                'IMAGE_NEEDED',
                'DISABLED',
                'OUT_OF_STOCK',
                'EXPIRED',
                'DELETED',
            ];
            describe('when disabled', () => {
                badStatuses.forEach(status => {
                    it(`should be disabled if status is ${status}`, () => {
                        sut.getStatus.and.returnValue(status);
                        expect(sut.isPublishDisabled()).toBeTruthy();
                    });
                });
            });

            it('should be enabled if status created', () => {
                sut.getStatus.and.returnValue('CREATED');
                expect(sut.isPublishDisabled()).toBeFalsy();
            });
        });

        describe('is save draft disabled', () => {
            const badStatuses = [
                'DISABLED',
                'UPCOMING',
                'OUT_OF_STOCK',
                'EXPIRED',
                'DELETED',
                'ACTIVE',
            ];
            describe('when disabled', () => {
                badStatuses.forEach(status => {
                    it(`should be disabled if status is ${status}`, () => {
                        sut.getStatus.and.returnValue(status);
                        expect(sut.isSaveDraftDisabled()).toBeTruthy();
                    });
                });
            });

            it('should be enabled if status created', () => {
                sut.getStatus.and.returnValue('CREATED');
                expect(sut.isSaveDraftDisabled()).toBeFalsy();
            });

            it('should be enabled if status data needed', () => {
                sut.getStatus.and.returnValue('DATA_NEEDED');
                expect(sut.isSaveDraftDisabled()).toBeFalsy();
            });

            it('should be enabled if status image needed', () => {
                sut.getStatus.and.returnValue('IMAGE_NEEDED');
                expect(sut.isSaveDraftDisabled()).toBeFalsy();
            });
        });

        describe('is save draft disabled', () => {
            describe('when save draft is disabled', () => {
                it('should be disabled', () => {
                    sut.isSaveDraftDisabled = jasmine.createSpy('isSaveDraftDisabled')
                        .and.returnValue(true);
                    expect(sut.isDeleteDisabled()).toBeTruthy();
                });
            });

            describe('when id is not assigned', () => {
                it('should be disabled', () => {
                    sut.isSaveDraftDisabled = jasmine.createSpy('isSaveDraftDisabled')
                        .and.returnValue(false);
                    id.value = null;
                    expect(sut.isDeleteDisabled()).toBeTruthy();
                });
            });

            it('should be enabled if status is ok and id is assigned', () => {
                sut.isSaveDraftDisabled = jasmine.createSpy('isSaveDraftDisabled')
                    .and.returnValue(false);
                expect(sut.isDeleteDisabled()).toBeFalsy();
            });

        });

        describe('is disable button disabled', () => {
            const badStatuses = [
                'DATA_NEEDED',
                'IMAGE_NEEDED',
                'DISABLED',
                'OUT_OF_STOCK',
                'EXPIRED',
                'DELETED',
                'CREATED',
            ];
            describe('when disabled', () => {
                badStatuses.forEach(status => {
                    it(`should be disabled if status is ${status}`, () => {
                        sut.getStatus.and.returnValue(status);
                        expect(sut.isDisableDisabled()).toBeTruthy();
                    });
                });
            });

            it('should be enabled if status created', () => {
                sut.getStatus.and.returnValue('ACTIVE');
                expect(sut.isDisableDisabled()).toBeFalsy();
            });

            it('should be enabled if status data needed', () => {
                sut.getStatus.and.returnValue('UPCOMING');
                expect(sut.isDisableDisabled()).toBeFalsy();
            });
        });

    });

    // TODO VN FIX
    xdescribe('Checking form for non-validity', () => {
        beforeEach(() => {
            sut.getType = jasmine.createSpy('getType').and.returnValue('offer');
            sut.form['submitted'] = true;
        });

        it('should be truthy if form non-validity', () => {
            offer.invalid = true;
            expect(sut.isCurrentFormInvalid()).toBeTruthy();
        });

        it('should be falsy if form valid', () => {
            offer.invalid = false;
            expect(sut.isCurrentFormInvalid()).toBeFalsy();
        });
    });

    describe('timestamp', () => {
        it('should be falsy if timestamp is not date', () => {
            sut.timeStamp = 'N/A';
            expect(sut.isTimeStampDate()).toBeFalsy();
        });

        it('should be truthy if timestamp is date', () => {
            sut.timeStamp = '2017-09-05T11:18:35';
            expect(sut.isTimeStampDate()).toBeTruthy();
        });
    });

});
