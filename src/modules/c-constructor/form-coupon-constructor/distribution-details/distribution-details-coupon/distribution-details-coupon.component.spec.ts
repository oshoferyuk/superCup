import { DistributionDetailsCouponComponent } from './distribution-details-coupon.component';
import { CalendarData, offerFields} from '../../form-coupon-constructor.constants';
import { Observable } from 'rxjs/Observable';
import { toggleDatePicker } from '../distribution-details.constants';
import { offerField } from '../../../services/offer-form.constants';

describe('DistributionDetailsCouponComponent', () => {
    let sut;
    let form;
    let DatePickerValidationService;
    let MaskService;
    let MarketingProgramStore;
    let ConsumerSegmentsStore;
    let OfferFormService;
    let ChangeDetectorRef;

    let formControls;
    let fixedExpiryDate;
    let rollingExpiryDays;
    let targetConsumerSegments;
    let dateMock;
    let formGet;
    let mockResultDialog;
    let rawFormValue;

    let openDatePicker;
    let notOpenDatePicker;
    let selectDatePicker;

    const defaultRollingExpirationDays = Symbol('defaultRollingExpirationDays');
    const numberMask = Symbol('numberMask');
    const textMask = Symbol('textMask');
    const consumerSegments = Symbol('consumerSegments');

    beforeEach(() => {
        mockResultDialog = {
            brands: [{name: 'brand'}],
            versions: [{name: 'version'}],
            result: [{gtin: '123'}, {gtin: '234'}]
        };
        dateMock = {endTime: '23:59:59', startTime: '00:00:00', startDate: {value: '2017-08-10'}, endDate: 'zzzzzzz'};

        rawFormValue = {
            [offerFields.clippedQuantity]: Math.random()
        };

        MarketingProgramStore = {
            getReceiptSubmissionDays: jasmine.createSpy('getReceiptSubmissionDays'),
            getRollingExpirationDays: jasmine.createSpy('getRollingExpirationDays')
                .and.returnValue(defaultRollingExpirationDays),
        };

        DatePickerValidationService = {
            onValidityStartChanged: jasmine.createSpy('onValidityStartChanged').and.returnValue(dateMock),
            onValidityEndChanged: jasmine.createSpy('onValidityEndChanged').and.returnValue(dateMock),
            onValidityExpiryChanged: jasmine.createSpy('onValidityExpiryChanged').and.returnValue(dateMock)
        };

        MaskService = {
            zeroOrOneWithDecimal: jasmine.createSpy('zeroOrOneWithDecimal').and.returnValue(textMask),
            onlyNumberMask: jasmine.createSpy('onlyNumberMask').and.returnValue(numberMask)
        };

        ConsumerSegmentsStore = {
            onUpdate: jasmine.createSpy('onUpdate').and.returnValue(Observable.from([consumerSegments, consumerSegments]))
        };

        OfferFormService = {
            resetField: jasmine.createSpy('resetField'),
            resetFieldWithValue: jasmine.createSpy('resetFieldWithValue'),
            toggleField: jasmine.createSpy('toggleField')
        };

        ChangeDetectorRef = {
            detectChanges: jasmine.createSpy('detectChanges')
        };

        sut = new DistributionDetailsCouponComponent(
            DatePickerValidationService,
            MarketingProgramStore,
            MaskService,
            ConsumerSegmentsStore,
            OfferFormService,
            ChangeDetectorRef,
        );
        sut.setProductBrandGroup = jasmine.createSpy('setProductBrandGroup');
        sut.marketingProgram = [{
            receiptSubmissionDays: 255,
            country: {timezoneName: 'UTC+2'}
        }, {receiptSubmissionDays: 255, country: {timezoneName: 'UTC+2'}}];

        formGet = {
            setValue: jasmine.createSpy('setValue'),
            value: Math.random(),
            reset: jasmine.createSpy('reset'),
            markAsUntouched: jasmine.createSpy('markAsUntouched')
        };

        form = {
            get: jasmine.createSpy('get').and.returnValue(formGet),
            getRawValue: jasmine.createSpy('get').and.returnValue(rawFormValue),
        };
        sut.form = form;
    });

    it('should have DatePickerOptions', () => {
        expect(sut.myDatePickerOptions).toEqual({
            width: '186px',
            height: '31px',
            inline: false,
            editableDateField: false,
            dateFormat: 'yyyy-mm-dd',
            showClearDateBtn: false,
            dayLabels: {
                su: 'Su',
                mo: 'Mo',
                tu: 'Tu',
                we: 'We',
                th: 'Th',
                fr: 'Fr',
                sa: 'Sa'
            },
            monthLabels: {
                1: 'January',
                2: 'February',
                3: 'March',
                4: 'April',
                5: 'May',
                6: 'June',
                7: 'July',
                8: 'August',
                9: 'September',
                10: 'October',
                11: 'November',
                12: 'December'
            },
            firstDayOfWeek: 'mo',
            sunHighlight: false,
            selectorWidth: '280px',
            selectorHeight: '257px'
        });
    });

    describe('on init', () => {
        beforeEach(() => {
            sut.switchTargeted = jasmine.createSpy('switchTargeted');
            sut.onConsumerSegmentsStoreUpdate = jasmine.createSpy('onConsumerSegmentsStoreUpdate');
            sut.ngOnInit();
        });

        it('should have expiries array as an initial value', () => {
            expect(sut.expiries.length).toBeGreaterThan(1);
            expect(sut.expiries).toEqual(['FIXED', 'ROLLING']);
        });

        it('should set only number mask on scope', () => {
            expect(sut.onlyNumberMask).toEqual(numberMask);
        });

        it('should set only decimal number mask on scope', () => {
            expect(sut.textMask).toEqual(textMask);
        });

        it('should subscribe to consumer segments changes', () => {
            expect(sut.onConsumerSegmentsStoreUpdate).toHaveBeenCalled();
        });

        describe('validity', () => {

            it('should have validityStartDatePickerOptions', () => {
                expect(sut.validityStartDatePickerOptions).toBeDefined();
            });

            it('should have validityStartDatePickerOptions dateformat yyyy-mm-dd; () => {', () => {
                expect(sut.validityStartDatePickerOptions.dateFormat).toEqual('yyyy-mm-dd');
            });

            it('should have validityEndDatePickerOptions', () => {
                expect(sut.validityEndDatePickerOptions).toBeDefined();
            });

            it('should have validityEndDatePickerOptions with disabled inline option', () => {
                expect(sut.validityEndDatePickerOptions.inline).toBeFalsy();
            });

            it('should have expiryDatePickerOptions', () => {
                expect(sut.expiryDatePickerOptions).toBeDefined();
            });

            it('should have expiryDatePickerOptions dateformat yyyy-mm-dd; () => {', () => {
                expect(sut.expiryDatePickerOptions.dateFormat).toEqual('yyyy-mm-dd');
            });
        });
    });

    describe('calendar toggle', () => {

        beforeEach(() => {
            openDatePicker = 1;
            notOpenDatePicker = 4;
            selectDatePicker = 2;
        });

        it('start open should set dpStartOpen to be truthy', () => {
            sut.calendarStartToggle(openDatePicker);
            expect(sut.dpStartOpen).toBeTruthy();
        });

        it('start close should set dpStartOpen to be falsy', () => {
            sut.calendarStartToggle(notOpenDatePicker);
            expect(sut.dpStartOpen).toBeFalsy();
        });

        it('end open should set dpEndOpen to be truthy', () => {
            sut.calendarEndToggle(openDatePicker);
            expect(sut.dpEndOpen).toBeTruthy();
        });

        it('end close should set dpEndOpen to be falsy', () => {
            sut.calendarEndToggle(notOpenDatePicker);
            expect(sut.dpEndOpen).toBeFalsy();
        });

        it('expiry open should set dpExpiryOpen to be truthy', () => {
            sut.calendarExpiryToggle(openDatePicker);
            expect(sut.dpExpiryOpen).toBeTruthy();
        });

        it('expiry select should empty dpExpiryOpen field', () => {
            sut.calendarExpiryToggle(selectDatePicker);
            expect(sut.dpExpiryOpen).toBeFalsy();
        });

        it('expiry Toggle should reset rolling field', () => {
            sut.calendarExpiryToggle(toggleDatePicker.chooseDate);
            expect(sut.offerFormService.resetFieldWithValue).toHaveBeenCalledWith(sut.form, offerFields.rollingExpiryDays, 0);
        });

    });

    describe('Target has changed', () => { // TODO need to fix
        beforeEach(() => {
            targetConsumerSegments = {
                reset: jasmine.createSpy('targetConsumerSegmentsReset'),
                disable: jasmine.createSpy('targetConsumerSegmentsSetErrors'),
                enable: jasmine.createSpy('targetConsumerSegmentsSetErrors')
            };
            formControls = {
                [offerFields.targetConsumerSegments]: targetConsumerSegments,
            };
            form = {
                get: jasmine.createSpy('get').and.callFake(type => formControls[type]),
            };
            sut.form = form;
            sut.isTargeted = jasmine.createSpy('notTargeted').and.returnValue(false);
            sut.switchTargeted();
        });

        it('should  reset targetConsumerSegments', () => {
            expect(sut.form.get('consumerSegments').reset).toHaveBeenCalled();
        });

        it('should disable targetConsumerSegments', () => {
            expect(sut.form.get('consumerSegments').disable).toHaveBeenCalled();
        });
    });

    describe('Target has changed', () => {
        beforeEach(() => {
            rollingExpiryDays = {
                reset: jasmine.createSpy('rollingExpiryDaysReset'),
                setErrors: jasmine.createSpy('rollingExpiryDaysSetErrors')
            };
            fixedExpiryDate = {
                reset: jasmine.createSpy('fixedExpiryDateReset'),
                setErrors: jasmine.createSpy('fixedExpiryDateSetErrors'),
                value: '01/01/2000'
            };
            formControls = {
                [offerFields.rollingExpiryDays]: rollingExpiryDays,
                [offerFields.fixedExpiryDate]: fixedExpiryDate,
            };
            form = {
                get: jasmine.createSpy('get').and.callFake(type => formControls[type]),
            };
            sut.form = form;
        });

        it('should reset with value rollingExpiryDays for rolling', () => {
            sut.isExpirySet = jasmine.createSpy('isExpirySet').and.returnValue(false);
            sut.isRollingSet = jasmine.createSpy('isRollingSet').and.returnValue(true);
            sut.resetMandatoryField(CalendarData.EXPIRY_ROLLING);
            expect(sut.offerFormService.resetFieldWithValue).toHaveBeenCalledWith(
                sut.form,
                offerFields.rollingExpiryDays,
                MarketingProgramStore.getRollingExpirationDays());
        });

        it('should reset with value rollingExpiryDays for fixed', () => {
            sut.isExpirySet = jasmine.createSpy('isExpirySet').and.returnValue(true);
            sut.isRollingSet = jasmine.createSpy('isRollingSet').and.returnValue(false);
            sut.resetMandatoryField(CalendarData.EXPIRY_FIXED);
            expect(sut.offerFormService.resetFieldWithValue).toHaveBeenCalledWith(
                sut.form,
                offerFields.rollingExpiryDays,
                MarketingProgramStore.getRollingExpirationDays());
        });

        it('should reset fixed expiry Date field for rolling', () => {
            sut.isExpirySet = jasmine.createSpy('isExpirySet').and.returnValue(true);
            sut.isRollingSet = jasmine.createSpy('isRollingSet').and.returnValue(false);
            sut.resetMandatoryField(CalendarData.EXPIRY_FIXED);
            expect(sut.offerFormService.toggleField).toHaveBeenCalledWith(sut.form, offerFields.fixedExpiryDate, offerField.enable);
        });

        it('should enable fixed expiry Date field for fixed', () => {
            sut.isExpirySet = jasmine.createSpy('isExpirySet').and.returnValue(true);
            sut.isRollingSet = jasmine.createSpy('isRollingSet').and.returnValue(false);
            sut.resetMandatoryField(CalendarData.EXPIRY_ROLLING);
            expect(sut.offerFormService.resetField).toHaveBeenCalledWith(sut.form, offerFields.fixedExpiryDate);
        });
    });

    describe('when consumer segments changes', () => {
        beforeEach(() => {
            sut.isTargeted = jasmine.createSpy('isTargeted').and.returnValue(true);
        });

        it('should get consumer segment control', () => {
            sut.isTargeted.and.returnValue(true);
            sut.onConsumerSegmentsStoreUpdate();
            expect(form.get).toHaveBeenCalledWith('consumerSegments');
        });

        describe('when update', () => {
            beforeEach(() => {
                sut.isTargeted.and.returnValue(true);
                sut.onConsumerSegmentsStoreUpdate();
            });

            describe('when initial consumer segment change', () => {
                it('should reset consumer segment control with initial value', () => {
                    expect(formGet.reset.calls.allArgs()[0][0]).toEqual(formGet.value);
                });
            });

            describe('when second time consumer segment change', () => {
                it('should reset consumer segment control with empty array', () => {
                    expect(formGet.reset.calls.allArgs()[1][0]).toEqual([]);
                });
            });

            it('should set consumer segments on scope', () => {
                expect(sut.consumerSegments).toEqual(consumerSegments);
            });

            it('should detect changes twice for two calls', () => {
                expect(ChangeDetectorRef.detectChanges).toHaveBeenCalledTimes(4);
            });

            it('should mark consumer segments control as untouched', () => {
                expect(formGet.markAsUntouched).toHaveBeenCalled();
            });
        });

        describe('when creation', () => {
            beforeEach(() => {
                sut.isTargeted.and.returnValue(true);
                formGet.value = null;
                sut.onConsumerSegmentsStoreUpdate();
            });

            it('should reset consumer segment control with empty array', () => {
                expect(formGet.reset.calls.allArgs()[0][0]).toEqual([]);
            });
        });

        describe('when creation and is not targeted', () => {
            beforeEach(() => {
                sut.isTargeted.and.returnValue(false);
                formGet.value = null;
                sut.onConsumerSegmentsStoreUpdate();
            });

            it('should reset consumer segment control with empty array', () => {
                expect(formGet.reset.calls.allArgs()[0][0]).toEqual(null);
            });
        });
    });
});
