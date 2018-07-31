import { OfferInformationCouponComponent } from './offer-information-coupon.component';
import { Observable } from 'rxjs/Rx';
import { offerFields } from '../../form-coupon-constructor.constants';

describe('OfferInformationCouponComponent', () => {
    let sut;
    let MarketingProgramStore;
    let MaskService;

    let form;
    let eanNumber;
    let printable;
    let highValue;
    let minimumPurchasePrice;
    let couponValue;
    let formControls;
    let printableCouponImage;
    let offerPrintingHouseID;
    let ChangeDetectorRef;

    const numberMask = Symbol('numberMask');
    const decimalMask = Symbol('decimalMask');
    const marketingProgram = {highValueOfferThreshold: 100};

    beforeEach(() => {
        MarketingProgramStore = {
            getSelectedMarketingProgram: jasmine.createSpy('getSelectedMarketingProgram').and.returnValue(marketingProgram),
        };

        MaskService = {
            onlyDecimalNumberMask: jasmine.createSpy('onlyDecimalNumberMask').and.returnValue(decimalMask),
            onlyNumberMask: jasmine.createSpy('onlyNumberMask').and.returnValue(numberMask)
        };

        ChangeDetectorRef = {
            detectChanges: jasmine.createSpy('detectChanges')
        };

        sut = new OfferInformationCouponComponent(
            MarketingProgramStore,
            ChangeDetectorRef,
            MaskService
        );
    });

    describe('on init', () => {
        beforeEach(() => {
            sut.subscribeToForm = jasmine.createSpy('subscribeToForm');
            sut.switchPrintable = jasmine.createSpy('switchPrintable');
            sut.ngOnInit();
        });

        it('should set only number mask on scope', () => {
            expect(sut.onlyNumberMask).toEqual(numberMask);
        });

        it('should set only decimal number mask on scope', () => {
            expect(sut.onlyDecimalNumberMask).toEqual(decimalMask);
        });

        it('should return decimal number', () => {
            sut.setCorrectCouponValue();
            expect(sut.autoCorrectedCouponValue('2')).toEqual({value: '2.00'});
            expect(sut.autoCorrectedCouponValue('2.00')).toEqual({value: '2.00'});
        });
    });

    describe('after view init', () => {
        beforeEach(() => {
            sut.handleAction = jasmine.createSpy('handleAction');
            sut.ngAfterViewInit();
        });

        it('should call handleAction', () => {
            expect(sut.handleAction).toHaveBeenCalled();
        });

        it('should detect changes', () => {
            expect(ChangeDetectorRef.detectChanges).toHaveBeenCalled();
        });
    });

    xdescribe('Coupon value changed', () => {
        beforeEach(() => {
            couponValue = {
                changeValue: jasmine.createSpy('subscribeCouponValue').and.returnValue(Observable.of(100)),
                value: '',
                setErrors: jasmine.createSpy('setError'),
                disable: jasmine.createSpy('disable'),
                enable: jasmine.createSpy('enable'),
            };
            printable = {
                changeValue: jasmine.createSpy('subscribePrintable').and.returnValue(Observable.of(false)),
                value: false
            };
            highValue = {
                setValue: jasmine.createSpy('highValueSet')
            };
            minimumPurchasePrice = {
                reset: jasmine.createSpy('reset'),
                setErrors: jasmine.createSpy('setErrors')
            };
            formControls = {
                [offerFields.couponValue]: couponValue,
                [offerFields.printable]: printable,
                [offerFields.highValue]: highValue,
                [offerFields.minimumPurchasePrice]: minimumPurchasePrice
            };
            form = {
                get: jasmine.createSpy('get').and.callFake(type => formControls[type])
            };
            sut.ngOnInit = jasmine.createSpy('ngOnInit').and.callFake(() => {
                sut.form = form;
            });
            sut.ngOnInit();
            sut.handleAction();
        });

        it('should invoke setErrors', () => {
            expect(sut.form.get('value').setErrors).toHaveBeenCalled();
        });

        it('should High Value to be true', () => {
            sut.couponIsHighValue = jasmine.createSpy('couponIsHighValue').and.returnValue(true);
            sut.form.get('value').value = '1';
            sut.form.get('printable').value = false;
            sut.handleAction();
            expect(highValue.setValue).toHaveBeenCalledWith(true);
        });

        it('should High Value to be false', () => {
            sut.couponIsHighValue = jasmine.createSpy('couponIsHighValue').and.returnValue(false);
            sut.form.get('value').value = '1';
            sut.form.get('printable').value = false;
            sut.handleAction();
            expect(highValue.setValue).toHaveBeenCalledWith(false);
            expect(minimumPurchasePrice.reset).toHaveBeenCalledWith(null);
            expect(minimumPurchasePrice.setErrors).toHaveBeenCalledWith(null);
        });
    });

    describe('image validation', () => {

        beforeEach(() => {

            const productImage = {
                markAsTouched: jasmine.createSpy('markAsTouched'),
                setErrors: jasmine.createSpy('setErrors'),
                setValue: jasmine.createSpy('setValue')
            };
            formControls = {
                [offerFields.productImage]: productImage
            };
            form = {
                get: jasmine.createSpy('get').and.callFake(type => formControls['imageUrl']),
            };
            sut.form = form;

        });

        it('should invoke setErrors for product image', () => {
            sut.productImageMaxSizeExceed();
            expect(sut.form.get('imageUrl').setValue).toHaveBeenCalled();
            expect(sut.form.get('imageUrl').setErrors).toHaveBeenCalledWith({maxSize: true});
            expect(sut.form.get('imageUrl').markAsTouched).toHaveBeenCalled();
        });

        it('should invoke setErrors for print image', () => {
            sut.productPrintMaxSizeExceed();
            expect(sut.form.get('printableCouponImage').setValue).toHaveBeenCalled();
            expect(sut.form.get('printableCouponImage').setErrors).toHaveBeenCalledWith({maxSize: true});
            expect(sut.form.get('printableCouponImage').markAsTouched).toHaveBeenCalled();
        });
    });

    describe('Printable has changed', () => {
        beforeEach(() => {
            eanNumber = {
                reset: jasmine.createSpy('eanNumberReset'),
                disable: jasmine.createSpy('eanNumberReset'),
                enable: jasmine.createSpy('eanNumberReset')
            };
            offerPrintingHouseID = {
                reset: jasmine.createSpy('offerPrintingHouseIDReset'),
                disable: jasmine.createSpy('offerPrintingHouseIDReset'),
                enable: jasmine.createSpy('offerPrintingHouseIDReset')
            };
            printableCouponImage = {
                reset: jasmine.createSpy('printableCouponImageReset'),
                disable: jasmine.createSpy('printableCouponImageReset'),
                enable: jasmine.createSpy('printableCouponImageReset')
            };

            formControls = {
                [offerFields.eanNumber]: eanNumber,
                [offerFields.offerPrintingHouseID]: offerPrintingHouseID,
                [offerFields.printableCouponImage]: printableCouponImage
            };
            form = {
                get: jasmine.createSpy('get').and.callFake(type => formControls[type]),
            };
            sut.form = form;
            sut.isPrintable = jasmine.createSpy('notPrintable').and.returnValue(false);
            sut.switchPrintable();
        });

        it('should  reset eanNumber', () => {
            expect(sut.form.get('eanNumber').reset).toHaveBeenCalled();
        });

        it('should  disable eanNumber', () => {
            expect(sut.form.get('eanNumber').disable).toHaveBeenCalled();
        });

        it('should  reset offerPrintingHouseID', () => {
            expect(sut.form.get('offerPrintingHouseID').reset).toHaveBeenCalled();
        });

        it('should disable offerPrintingHouseID', () => {
            expect(sut.form.get('offerPrintingHouseID').disable).toHaveBeenCalled();
        });

        it('should  reset printableCouponImage', () => {
            expect(sut.form.get('printableCouponImage').reset).toHaveBeenCalled();
        });

        it('should disable printableCouponImage', () => {
            expect(sut.form.get('printableCouponImage').disable).toHaveBeenCalled();
        });
    });
});
