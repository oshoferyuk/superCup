import { Observable } from 'rxjs/Observable';
import { DistributionDetailsSampleComponent } from './distribution-details-sample.component';

describe('DistributionDetailsSampleComponent', () => {
    let sut;
    let form;
    let datePickerService;
    let MaskService;
    let ConsumerSegmentsStore;
    let ChangeDetectorRef;

    let dateMock;
    let formGet;
    let mockResultDialog;

    const numberMask = Symbol('numberMask');
    const textMask = Symbol('textMask');
    const consumerSegments = Symbol('consumerSegments');

    beforeEach(() => {
        mockResultDialog = {
            brands: [{name: 'brand'}],
            versions: [{name: 'version'}],
            result: [{gtin: '123'}, {gtin: '234'}]
        };

        dateMock = {
            endTime: '23:59:59',
            startTime: '00:00:00',
            startDate: {value: '2017-08-10'},
            endDate: {value: '2017-08-11'}
        };

        datePickerService = {
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

        ChangeDetectorRef = {
            detectChanges: jasmine.createSpy('detectChanges')
        };

        sut = new DistributionDetailsSampleComponent(
            datePickerService,
            MaskService,
            ConsumerSegmentsStore,
            ChangeDetectorRef,
        );

        sut.marketingProgram = [{
            receiptSubmissionDays: 255,
            country: {timezoneName: 'UTC+2'}
        }, {receiptSubmissionDays: 255, country: {timezoneName: 'UTC+2'}}];
        sut.switchTargeted = jasmine.createSpy('switchTargeted');

        formGet = {
            setValue: jasmine.createSpy('setValue'),
            value: Math.random(),
            reset: jasmine.createSpy('reset'),
            markAsUntouched: jasmine.createSpy('markAsUntouched')
        };

        form = {
            get: jasmine.createSpy('get').and.returnValue(formGet),
        };
        sut.form = form;
    });

    describe('on init', () => {
        beforeEach(() => {
            sut.onConsumerSegmentsStoreUpdate = jasmine.createSpy('onConsumerSegmentsStoreUpdate');
            sut.ngOnInit();
        });

        it('should have DatePickerOptions', () => {
            expect(sut.myDatePickerOptions).toBeDefined();
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
