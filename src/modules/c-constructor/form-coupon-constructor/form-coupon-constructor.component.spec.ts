import { FormCouponConstructorComponent } from './form-coupon-constructor.component';
import { Observable } from 'rxjs/Observable';

describe('FormCouponConstructorComponent', () => {
    let sut;
    let OfferFormService;
    let OfferStore;
    let ChangeDetectorRef;
    let ViewContainerRef;
    let ProductSelectorService;

    let form;

    let formValue;
    let type;

    beforeEach(() => {
        formValue = {
            type: Symbol('type')
        };

        type = {
            value: 'type',
            setValue: jasmine.createSpy('setValue')
        };

        form = {
            getRawValue: jasmine.createSpy('getRawValue').and.returnValue(formValue),
            get: jasmine.createSpy('get').and.returnValue(type)
        };

        OfferFormService = {
            resetForm: jasmine.createSpy('resetForm'),
            showSwitchTypeDialog: jasmine.createSpy('showSwitchTypeDialog')
                .and.returnValue(Observable.of(1))
        };

        OfferStore = {
            setFormForUpdates: jasmine.createSpy('setFormForUpdates')
        };

        ChangeDetectorRef = {
            markForCheck: jasmine.createSpy('markforCheck')
        };

        ProductSelectorService = {
            resetData: jasmine.createSpy('resetData')
        };

        ViewContainerRef = {};

        sut = new FormCouponConstructorComponent(
            OfferFormService,
            ChangeDetectorRef,
            ProductSelectorService,
            ViewContainerRef,
        );

        sut.form = form;
    });

    describe('on init', () => {
        beforeEach(() => {
            sut.setOfferInfoFormGroupActive = jasmine.createSpy('setOfferGroup');
            sut.setOfferType = jasmine.createSpy('setOfferType');
            sut.ngOnInit();
        });

        it('should have offer tab types on scope', () => {
            expect(sut.offerTabTypes);
        });

        it('should set offer information tab as default', () => {
            expect(sut.setOfferInfoFormGroupActive).toHaveBeenCalled();
        });

        it('should set offer type according to form', () => {
            expect(sut.formTypeActive).toEqual(type.value);
        });
    });

    describe('on do check', () => {
        it('should mark for check if form submitted', () => {
            sut.form.submitted = true;
            sut.ngDoCheck();
            expect(ChangeDetectorRef.markForCheck).toHaveBeenCalled();
        });

        it('should not mark for check if form is not submitted', () => {
            sut.form.submitted = false;
            sut.ngDoCheck();
            expect(ChangeDetectorRef.markForCheck).not.toHaveBeenCalled();
        });
    });

    describe('form group activation', () => {
        describe('offer information tab', () => {
            beforeEach(() => {
                sut.setOfferInfoFormGroupActive();
            });

            it('should have correct form groupActive Name for offer', () => {
                expect(sut.formGroupActive).toEqual('OFFER_INFORMATION');
            });

            it('should check current groupActive Name for offer', () => {
                expect(sut.isOfferInfoFormGroupActive()).toBeTruthy();
            });

            it('should call for change detection', () => {
                expect(ChangeDetectorRef.markForCheck).toHaveBeenCalled();
            });
        });

        describe('distribution details tab', () => {
            beforeEach(() => {
                sut.setDistributionDetailsFormActive();
            });

            it('should have correct form groupActive Name for distribution', () => {
                expect(sut.formGroupActive).toEqual('DISTRIBUTION_DETAILS');
            });

            it('should check current groupActive Name for distribution', () => {
                expect(sut.isDistributionDetailsFormActive()).toBeTruthy();
            });

            it('should call for change detection', () => {
                expect(ChangeDetectorRef.markForCheck).toHaveBeenCalled();
            });
        });
    });

    describe('set offer type', () => {
        const activeType = 'test';

        beforeEach(() => {
            sut.setOfferType(activeType);
        });

        it('should set type action', () => {
            expect(sut.formTypeActive).toEqual(activeType);
        });

        it('should call for change detection', () => {
            expect(ChangeDetectorRef.markForCheck).toHaveBeenCalled();
        });

        it('should set value for type', () => {
            expect(type.setValue).toHaveBeenCalledWith(activeType);
        });
    });

    describe('on switch click', () => {
        let MouseEvent;
        let currentType;

        beforeEach(() => {
            currentType = {
                value: 'coupon',
                setValue: jasmine.createSpy('setValue')
            };
            sut.form.get.and.returnValue(currentType);

            MouseEvent = {
                preventDefault: jasmine.createSpy('preventDefault')
            };
        });

        describe('when type is same as current', () => {
            beforeEach(() => {
                sut.formTypeActive = currentType.value;
                sut.setOfferType = jasmine.createSpy('setOfferType');
                sut.switchType = jasmine.createSpy('switchType');
                sut.onSwitchTypeClick(MouseEvent, currentType.value);
            });

            it('should not switch type', () => {
                expect(sut.switchType).not.toHaveBeenCalled();
            });

            it('should not set offer type', () => {
                expect(sut.setOfferType).not.toHaveBeenCalled();
            });
        });

        describe('when form is pristine', () => {
            let id;

            beforeEach(() => {
                id = {
                    setValue: jasmine.createSpy('setValue'),
                    pristine: true
                };
                sut.formTypeActive = 'id';
                sut.switchType = jasmine.createSpy('switchType');
                sut.setOfferType = jasmine.createSpy('setOfferType');
                sut.form.get.and.returnValue(id);
                sut.isCurrentType = jasmine.createSpy('isCurrentType').and.returnValue(false);
            });

            describe('when form is not saved', () => {
                beforeEach(() => {
                    sut.onSwitchTypeClick(MouseEvent, currentType.value);
                });

                it('should set offer type', () => {
                    expect(sut.setOfferType).toHaveBeenCalled();
                });

                it('should not switch type', () => {
                    expect(sut.switchType).not.toHaveBeenCalled();
                });
            });

            describe('when form is saved', () => {
                beforeEach(() => {
                    id.value = '1';
                    sut.onSwitchTypeClick(MouseEvent, currentType.value);
                });

                it('should not set offer type', () => {
                    expect(sut.setOfferType).not.toHaveBeenCalled();
                });

                it('should switch type', () => {
                    expect(sut.switchType).toHaveBeenCalled();
                });
            });
        });

        describe('when type is not same as current and form not pristine', () => {
            const newType = 'sample';

            beforeEach(() => {
                sut.isCurrentType = jasmine.createSpy('isCurrentType').and.returnValue(false);
                sut.isFormPristine = jasmine.createSpy('isFormPristine').and.returnValue(false);
                sut.setOfferType = jasmine.createSpy('setOfferType');
                sut.onSwitchTypeClick(MouseEvent, newType);
            });

            it('should prevent radio button from change', () => {
                expect(MouseEvent.preventDefault).toHaveBeenCalled();
            });

            it('should show switch dialog', () => {
                expect(OfferFormService.showSwitchTypeDialog).toHaveBeenCalledWith(ViewContainerRef);
            });

            it('should set offer type', () => {
                expect(sut.setOfferType).toHaveBeenCalledWith(newType);
            });

            it('should reset form', () => {
                expect(OfferFormService.resetForm).toHaveBeenCalledWith(form);
            });
        });
    });
});
