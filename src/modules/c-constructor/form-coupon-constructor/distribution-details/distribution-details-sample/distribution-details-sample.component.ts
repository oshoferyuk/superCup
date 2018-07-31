import { ChangeDetectorRef, Component, DoCheck, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { IMyDpOptions, IMyInputFieldChanged } from 'mydatepicker';
import { Subject } from 'rxjs/Subject';
import { ConsumerSegments } from '../../../../../core/models/consumer-segments.model';
import { SelectDropdownMenu } from '../../../../../core/models/select-menu.model';
import { Mask, MaskService } from '../../../../../core/services/validators/mask.service';
import { ConsumerSegmentsStore } from '../../../consumer-segments/consumer-segments.store';
import { DatePickerValidationService } from '../../../services/date-picker-validation.service';
import { CalendarData, lineOfBusinessTypes, offerFields } from '../../form-coupon-constructor.constants';
import { toggleDatePicker } from '../distribution-details.constants';

@Component({
    selector: 'fp-distribution-details-sample',
    templateUrl: './distribution-details-sample.component.html',
    styleUrls: ['./distribution-details-sample.component.scss']
})
export class DistributionDetailsSampleComponent implements OnInit, DoCheck, OnDestroy {
    @Input() form: FormGroup;
    @Input() marketingProgram: any;

    offerFields: any;
    validityStartDatePickerOptions: IMyDpOptions;
    validityEndDatePickerOptions: IMyDpOptions;
    expiryDatePickerOptions: IMyDpOptions;
    startDate: {};
    endDate: {};
    expiredDate: {};
    onlyNumberMask: RegExp[];
    textMask: Mask;
    consumerSegments: ConsumerSegments[];
    lineOfBusiness: SelectDropdownMenu[] = lineOfBusinessTypes;
    myDatePickerOptions: IMyDpOptions = {
        dateFormat: CalendarData.DATEPICKER_DATE_FORMAT,
        height: CalendarData.DATEPICKER_HEIGHT,
        width: CalendarData.DATEPICKER_WIDTH,
        inline: CalendarData.DATEPICKER_INLINE,
        editableDateField: CalendarData.DATEPICKER_EDIT,
        showClearDateBtn: CalendarData.DATEPICKER_CLEAR_BTN,
        dayLabels: CalendarData.DATEPICKER_DAY_LABELS,
        firstDayOfWeek: CalendarData.DATEPICKER_FIRST_DAY_OF_WEEK,
        sunHighlight: CalendarData.DATEPICKER_SUN_HIGHLIGHT,
        monthLabels: CalendarData.DATEPICKER_MONTH,
        selectorWidth: CalendarData.DATAPICKER_SELECTOR_WIDTH,
        selectorHeight: CalendarData.DATAPICKER_SELECTOR_HEIGHT
    };
    expiries: string[] = [CalendarData.EXPIRY_FIXED, CalendarData.EXPIRY_ROLLING];
    offerSubDays: number;
    startTime: string = CalendarData.VALIDITY_START_TIME;
    endTime: string = CalendarData.VALIDITY_END_TIME;
    timezoneName: string = '';
    dpStartOpen: boolean = false;
    dpEndOpen: boolean = false;

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private datePickerValidationService: DatePickerValidationService,
        private maskService: MaskService,
        private consumerSegmentsStore: ConsumerSegmentsStore,
        private cd: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        this.onlyNumberMask = this.maskService.onlyNumberMask();
        this.textMask = this.maskService.zeroOrOneWithDecimal();
        this.validityStartDatePickerOptions = this.getCopyOfOptions();
        this.validityEndDatePickerOptions = this.getCopyOfOptions();
        this.expiryDatePickerOptions = this.getCopyOfOptions();
        this.offerFields = offerFields;
        this.switchTargeted();
        this.onConsumerSegmentsStoreUpdate();
    }

    ngDoCheck(): void {
        const clippedQuantity = this.form.getRawValue()[offerFields.clippedQuantity];
        this.form.get([offerFields.distributionQuantity]).setValidators([Validators.required, Validators.min(clippedQuantity)]);

    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    getCopyOfOptions(): IMyDpOptions {
        return JSON.parse(JSON.stringify(this.myDatePickerOptions));
    }

    isTargeted(): boolean {
        return this.form.getRawValue()[offerFields.targeted];
    }

    switchTargeted(): void {
        const targetConsumerSegments = this.form.get(offerFields.targetConsumerSegments);

        if (!this.isTargeted()) {
            targetConsumerSegments.reset();
            targetConsumerSegments.disable();

        } else {
            targetConsumerSegments.enable();
        }
    }

    onValidityStartChanged(date: IMyInputFieldChanged): void {

        Object.assign(this, this.datePickerValidationService.validityStartChanged(date));
    }

    onValidityEndChanged(date: IMyInputFieldChanged): void {

        Object.assign(this, this.datePickerValidationService.validityEndChanged(date));
    }

    calendarStartToggle(state: number): void {
        state === toggleDatePicker.openDatePicker
            ? this.dpStartOpen = true
            : this.dpStartOpen = false;
    }

    calendarEndToggle(state: number): void {
        state === toggleDatePicker.openDatePicker
            ? this.dpEndOpen = true
            : this.dpEndOpen = false;
    }

    private onConsumerSegmentsStoreUpdate(): void {
        const targetConsumerSegments = this.form.get(offerFields.targetConsumerSegments);
        let initialData = targetConsumerSegments.value;

        this.consumerSegmentsStore.onUpdate()
            .takeUntil(this.ngUnsubscribe)
            .subscribe((consumerSegments) => {
                this.consumerSegments = consumerSegments;
                this.cd.detectChanges();
                if (this.isTargeted()) {
                    targetConsumerSegments.reset(initialData || []);
                } else {
                    targetConsumerSegments.reset(initialData || null);
                }
                targetConsumerSegments.markAsUntouched();
                initialData = null;
                this.cd.detectChanges();
            });
    }
}
