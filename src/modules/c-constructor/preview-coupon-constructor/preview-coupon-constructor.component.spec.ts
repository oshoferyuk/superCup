import { PreviewCouponConstructorComponent } from './preview-coupon-constructor.component';
import { fakeAsync, tick } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { offerFields } from '../form-coupon-constructor/form-coupon-constructor.constants';


describe('PreviewCouponConstructorComponent', () => {
    let sut;
    let formCoupon;
    let formSample;
    let TranslateService;

    beforeEach(() => {
        TranslateService = {
            instant: jasmine.createSpy('instant').and.callFake((sampleValue) => {
                return sampleValue === 'offer.sampleValues.MULTIPLE_USE'
                    ? 'Multiple Use'
                    : '£';
            })
        };

        sut = new PreviewCouponConstructorComponent(
            TranslateService
        );

        sut.marketingProgram = {
            country: {
                currencyCode: 'GBP'
            }
        };
    });

    describe('when created', () => {
        it('should been defined', () => {
            expect(sut).toBeDefined();
        });
    });

    describe('when changing form data', () => {

        describe('coupon type', () => {
            beforeEach(() => {
                formCoupon = {
                    type: 'coupon',
                    coupon: {
                        type: 'coupon',
                        clearingCode: '123',
                        eanNumber: '234',
                        couponValue: 10.23,
                        imageUrl: 'img',
                        productDescription: 'Description',
                        isWebView: true
                    }
                };

                sut.getCouponValue = jasmine.createSpy('getCouponValue').and.returnValue('$10.23 OFF');
                sut.form = {
                    valueChanges: Observable.timer(5).map(() => formCoupon),
                    getRawValue: jasmine.createSpy('getRawValue').and.returnValue(formCoupon)

                };
            });

            it('should has nsn code value', fakeAsync(() => {
                sut.ngOnInit();
                tick(5);
                expect(sut.ncnCode).toEqual('123');
            }));

            it('should has ean number value', fakeAsync(() => {
                sut.ngOnInit();
                tick(5);
                expect(sut.eanNumber).toEqual('234');
            }));

            it('should has coupon value', fakeAsync(() => {
                sut.ngOnInit();
                tick(5);
                expect(sut.couponValue).toEqual('$10.23 OFF');
            }));

            it('should has productImage', fakeAsync(() => {
                sut.ngOnInit();
                tick(5);
                expect(sut.productImage).toEqual('img');
            }));

            it('should has product description', fakeAsync(() => {
                sut.ngOnInit();
                tick(5);
                expect(sut.offerDescription).toEqual('Description');
            }));

            it('should has preview web is true', fakeAsync(() => {
                sut.ngOnInit();
                tick(5);
                sut.setWebPreview();
                expect(sut.isWebView).toBeTruthy();
            }));

            it('should has preview web is false', fakeAsync(() => {
                sut.ngOnInit();
                tick(5);
                sut.setPrintablePreview();
                expect(sut.isWebView).toBeFalsy();
            }));

            it('should set offer type for coupon', fakeAsync(() => {
                sut.ngOnInit();
                tick(5);
                expect(sut.offerType).toEqual('offer.preview.coupon');
            }));

            it('should set web view is true if we trigger on unprintable', fakeAsync(() => {
                sut.ngOnInit();
                tick(5);
                formCoupon.coupon.printable = false;
                expect(sut.isWebView).toBeTruthy();
            }));

            it('should set web view is true if we trigger on printable', fakeAsync(() => {
                sut.ngOnInit();
                tick(5);
                formCoupon.coupon.printable = true;
                expect(sut.isWebView).toMatch(/true|false/);
            }));

            it('should hide meta data if coupon is unprintable', fakeAsync(() => {
                sut.ngOnInit();
                tick(5);
                sut.printable = false;
                sut.isWebView = false;
                expect(sut.toggleMetaData()).toBeFalsy();
            }));
        });

        describe('sample type', () => {
            beforeEach(() => {
                formCoupon = {
                    type: 'sample',
                    sample: {
                        sampleValue: 'Multiple Use'
                    }
                };

                sut.getCouponValue = jasmine.createSpy('getCouponValue').and.returnValue('Multiple Use');
                sut.form = {
                    valueChanges: Observable.timer(5).map(() => formCoupon),
                    getRawValue: jasmine.createSpy('getRawValue').and.returnValue(formCoupon)

                };
            });

            it('should has sample value', fakeAsync((formCoupon) => {
                sut.ngOnInit();
                tick(5);
                expect(sut.couponValue).toEqual('Multiple Use');
            }));

            it('should set offer type for sample', fakeAsync((formCoupon) => {
                sut.ngOnInit();
                tick(5);
                expect(sut.offerType).toEqual('offer.preview.sample');
            }));
        });
    });

    describe('get coupon value', () => {
        beforeEach(() => {
            formCoupon = {
                type: 'coupon',
                coupon: {
                    [offerFields.couponValue]: 10.23,
                }
            };

            formSample = {
                type: 'sample',
                sample: {
                    [offerFields.sampleValue]: 'MULTIPLE_USE'
                }
            };
        });

        it('should return coupon formatted value', () => {
            expect(sut.getCouponValue(formCoupon)).toEqual('£ 10.23 OFF');
        });

        it('should return sample formatted value', () => {
            expect(sut.getCouponValue(formSample)).toEqual('Multiple Use');
        });
    });
});
