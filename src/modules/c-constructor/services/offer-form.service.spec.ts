import { Validators } from '@angular/forms';
import { OfferFormService } from './offer-form.service';
import { offerStatuses } from '../submit-form-coupon-constructor/offer-statuses.constants';
import { Observable } from 'rxjs/Observable';
import { offerField } from './offer-form.constants';

describe('OfferFormService', () => {
    let sut;
    let FormBuilder;
    let OfferStore;
    let DialogService;
    let result;

    const sampleForm = Symbol('sampleForm');
    const couponForm = Symbol('couponForm');
    const offerGroup = Symbol('offerGroup');
    const sampleFormFields = {
        id: null,
        type: 'sample',
        channelId: null,
        language: null,
        currency: null,
        samplePartTypeCode: [{value: null}, Validators.required],
        productDescription: [{value: null}, Validators.required],
        brand: [{value: null}, Validators.required],
        summary: [{value: null}, Validators.required],
        imageUrl: [{value: null}, Validators.required],
        validityStart: [{value: null}, Validators.required],
        validityStartTime: null,
        validityEnd: [{value: null}, Validators.required],
        validityEndTime: null,
        targeted: null,
        consumerSegments: [{value: null}, Validators.required],
        estimatedRedemptionRate: [
            {value: null},
            [
                Validators.required,
                Validators.min(0),
                Validators.max(1)
            ]
        ],
        budgetName: null,
        budgetCode: null,
        quantityStart: [{value: null}, Validators.required],
        itemGtins: [{value: null, disabled: true}],
        selectedProductsSummary: null,
        clippedQuantity: null,
        itemUuids: [],
    };
    const couponFormFields = {
        id: null,
        type: 'coupon',
        channelId: null,
        language: null,
        currency: null,
        printable: [{value: null, disabled: false}, Validators.required],
        offerPrintingHouseID: [{value: null}, Validators.required],
        eanNumber: [{value: null}, Validators.required],
        highValue: [{value: null, disabled: true}],
        minimumPurchasePrice: [{value: null}, Validators.required],
        clearingCode: null,
        value: [{value: null}, Validators.required],
        productDescription: [{value: null}, Validators.required],
        brand: [{value: null}, Validators.required],
        summary: [{value: null}, Validators.required],
        imageUrl: [{value: null}, Validators.required],
        printableCouponImage: [{value: null}, Validators.required],
        expiryType: null,
        validityStart: [{value: null}, Validators.required],
        validityEnd: [{value: null}, Validators.required],
        fixedExpiration: null,
        rollingExpirationDays: [{value: null}, Validators.required],
        targeted: null,
        consumerSegments: [{value: null}, Validators.required],
        subdays: [{value: null}, Validators.required],
        requiredPurchaseQuantity: [{value: null}, Validators.required],
        estimatedRedemptionRate: [
            {value: null},
            [
                Validators.required,
                Validators.min(0),
                Validators.max(1)
            ]
        ],
        budgetName: [{value: null}, Validators.required],
        budgetCode: [{value: null}, Validators.required],
        quantityStart: [{value: null}, Validators.required],
        itemGtins: [],
        selectedProductsSummary: null,
        validityStartTime: null,
        validityEndTime: null,
        clippedQuantity: null,
        itemUuids: [],
    };

    beforeEach(() => {
        FormBuilder = {
            group: jasmine.createSpy('createFormGroup').and.returnValue(offerGroup)
        };

        OfferStore = {
            updateOffer: jasmine.createSpy('updateOffer')
        };

        DialogService = {
            confirm: jasmine.createSpy('confirm').and.returnValue(Observable.of(1))
        };

        sut = new OfferFormService(
            FormBuilder,
            OfferStore,
            DialogService
        );
    });

    describe('create form', () => {
        beforeEach(() => {
            sut.createSampleForm = jasmine.createSpy('createSampleForm').and.returnValue(sampleForm);
            sut.createCouponForm = jasmine.createSpy('createCouponForm').and.returnValue(couponForm);
            result = sut.createForm();
        });

        it('should create form with type, sample form and coupon form', () => {
            expect(FormBuilder.group).toHaveBeenCalledWith({
                id: null,
                status: 'DATA_NEEDED',
                type: 'coupon',
                sample: sampleForm,
                coupon: couponForm
            });
        });

        it('should return created offer form group', () => {
            expect(result).toEqual(offerGroup);
        });
    });

    describe('create coupon form', () => {
        beforeEach(() => {
            result = sut.createCouponForm();
        });

        // TODO VN think how to compare deep
        xit('should create form with type, sample form and coupon form', () => {
            expect(FormBuilder.group).toHaveBeenCalledWith(couponFormFields);
        });

        it('should return created offer form group', () => {
            expect(result).toEqual(offerGroup);
        });
    });

    describe('create sample form', () => {
        beforeEach(() => {
            result = sut.createSampleForm();
        });

        // TODO VN think how to compare deep
        xit('should create form with type, sample form and coupon form', () => {
            expect(FormBuilder.group).toHaveBeenCalledWith(sampleFormFields);
        });

        it('should return created offer form group', () => {
            expect(result).toEqual(offerGroup);
        });
    });

    describe('set default values', () => {
        let form;
        let formGroups;
        let sampleFormGroup;
        let couponFormGroup;

        beforeEach(() => {
            sampleFormGroup = {
                reset: jasmine.createSpy('sampleReset'),
                markAsPristine: jasmine.createSpy('markAsPristineSample')
            };

            couponFormGroup = {
                reset: jasmine.createSpy('couponReset'),
                markAsPristine: jasmine.createSpy('markAsPristineCoupon')
            };

            formGroups = {
                sample: sampleFormGroup,
                coupon: couponFormGroup,
                type: {
                    value: 'sample'
                }
            };

            form = {
                get: jasmine.createSpy('get').and.callFake(type => formGroups[type]),
                reset: jasmine.createSpy('reset'),
                submitted: true
            };
            sut.resetForm(form);
        });

        it('should reset form to unsubmitted', () => {
            expect(form.submitted).toEqual(null);
        });

        it('should reset form saving type and new status', () => {
            expect(form.reset).toHaveBeenCalledWith({
                type: 'sample',
                status: offerStatuses.dataNeeded
            });
        });

        it('should mark coupon form as pristine', () => {
            expect(couponFormGroup.markAsPristine).toHaveBeenCalled();
        });

        it('should mark sample form as pristine', () => {
            expect(sampleFormGroup.markAsPristine).toHaveBeenCalled();
        });
    });

    describe('fields', () => {
        let form;

        beforeEach(() => {

            form = {
                get: jasmine.createSpy('get').and.returnValue({
                    reset: jasmine.createSpy('reset'),
                    enable: jasmine.createSpy('enable'),
                    disable: jasmine.createSpy('disable')
                })
            };
        });

        it('should reset field', () => {
            sut.resetField(form, 'any');
            expect(form.get().reset).toHaveBeenCalledWith(null);
            expect(form.get().disable).toHaveBeenCalled();
        });

        it('should reset field with value not zero', () => {
            sut.resetFieldWithValue(form, 'any', 1);
            expect(form.get().reset).toHaveBeenCalledWith(1);
            expect(form.get().enable).toHaveBeenCalled();
        });

        it('should reset field with value Zero', () => {
            sut.resetFieldWithValue(form, 'any', 0);
            expect(form.get().reset).toHaveBeenCalledWith(null);
            expect(form.get().disable).toHaveBeenCalled();
        });

        it('should enable field', () => {
            sut.toggleField(form, 'any', offerField.enable);
            expect(form.get().enable).toHaveBeenCalled();
        });

        it('should disable field', () => {
            sut.toggleField(form, 'any', offerField.disable);
            expect(form.get().disable).toHaveBeenCalled();
        });
    });

    describe('convert date format', () => {
        let parsedDates;

        beforeEach(() => {
            parsedDates = {
                validityStart: "2017-08-12T00:00:00",
                validityEnd: "2017-08-12T23:59:59",
                fixedExpiration: "2017-08-12T23:59:59"
            };
        });

        it('should convert data from server for StartDate', () => {
            sut.convertDateToFormFormat(parsedDates);
            expect(parsedDates.validityStart['formatted']).toEqual('2017-08-12');
            expect(parsedDates.validityStart['date']['year']).toEqual(2017);
            expect(parsedDates.validityStart['date']['month']).toEqual(8);
            expect(parsedDates.validityStart['date']['day']).toEqual(12);
        });

        it('should convert data from server for EndDate', () => {
            sut.convertDateToFormFormat(parsedDates);
            expect(parsedDates.validityEnd['formatted']).toEqual('2017-08-12');
            expect(parsedDates.validityEnd['date']['year']).toEqual(2017);
            expect(parsedDates.validityEnd['date']['month']).toEqual(8);
            expect(parsedDates.validityEnd['date']['day']).toEqual(12);
        });

        it('should convert data from server for Fixed ate', () => {
            sut.convertDateToFormFormat(parsedDates);
            expect(parsedDates.fixedExpiration['formatted']).toEqual('2017-08-12');
            expect(parsedDates.fixedExpiration['date']['year']).toEqual(2017);
            expect(parsedDates.fixedExpiration['date']['month']).toEqual(8);
            expect(parsedDates.fixedExpiration['date']['day']).toEqual(12);
        });
    });

    describe('update form', () => {
        let offer;
        const form = Symbol('form');
        const preparedOffer = Symbol('prepared');

        beforeEach(() => {
            offer = {
                type: 'type'
            };

            sut.convertDateToFormFormat = jasmine.createSpy('convertDate');
            sut.prepareResponseOffer = jasmine.createSpy('prepare').and.returnValue(preparedOffer);
            sut.resetForm = jasmine.createSpy('resetForm');
        });

        describe('when offer is not defined', () => {
            beforeEach(() => {
                sut.updateFormWithOffer = jasmine.createSpy('updateFormWithOffer');
                sut.updateForm(undefined, form);
            });

            it('should reset form', () => {
                expect(sut.resetForm).toHaveBeenCalledWith(form);
            });

            it('should not update form', () => {
                expect(sut.updateFormWithOffer).not.toHaveBeenCalled();
            });
        });

        describe('when offer is defined', () => {
            beforeEach(() => {
                sut.updateForm(offer, form);
            });

            it('should reset form', () => {
                expect(sut.resetForm).toHaveBeenCalledWith(form);
            });

            describe('update form', () => {
                it('should convert date', () => {
                    expect(sut.convertDateToFormFormat).toHaveBeenCalledWith(offer);
                });

                describe('update store', () => {
                    it('should prepare offer from response', () => {
                        expect(sut.prepareResponseOffer).toHaveBeenCalledWith(offer, offer.type);
                    });

                    it('should update stored offer', () => {
                        expect(OfferStore.updateOffer).toHaveBeenCalledWith(preparedOffer);
                    });
                });
            });
        });
    });

    describe('show switch type dialog', () => {
        const ViewContainerRef = Symbol('ref');

        beforeEach(() => {
            sut.showSwitchTypeDialog(ViewContainerRef);
        });

        it('should open confirm dialog', () => {
            expect(DialogService.confirm).toHaveBeenCalledWith(
                ViewContainerRef,
                jasmine.objectContaining({
                    options: {
                        message: 'offer.dialogs.switchType.message',
                        ok: 'buttons.create',
                        cancel: 'buttons.cancel'
                    }
                })
            );
        });
    });

    it('should prepare offer form response', () => {
        const id = Symbol('id');
        const status = Symbol('status');
        const type = Symbol('type');
        const offer = {
            id,
            status,
            type,
        };

        result = sut.prepareResponseOffer(offer, type);
        expect(result).toEqual({
            id,
            status,
            type,
            [type]: offer,
        });
    });
});
