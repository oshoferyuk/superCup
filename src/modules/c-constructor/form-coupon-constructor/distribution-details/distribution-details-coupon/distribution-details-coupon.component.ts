import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { IMyDpOptions, IMyInputFieldChanged } from 'mydatepicker';
import { Subject } from 'rxjs/Subject';
import { ConsumerSegments } from '../../../../../core/models/consumer-segments.model';
import { Mask, MaskService } from '../../../../../core/services/validators/mask.service';
import { ConsumerSegmentsStore } from '../../../consumer-segments/consumer-segments.store';
import { DatePickerValidationService } from '../../../services/date-picker-validation.service';
import { MarketingProgramStore } from '../../../services/marketing-program.store';
import { CalendarData, offerFields } from '../../form-coupon-constructor.constants';
import { toggleDatePicker } from '../distribution-details.constants';
import { OfferFormService } from '../../../services/offer-form.service';
import { offerField } from '../../../services/offer-form.constants';

@Component({
    selector: 'fp-distribution-details-coupon',
    templateUrl: './distribution-details-coupon.component.html',
    styleUrls: ['./distribution-details-coupon.component.scss'],
})
export class DistributionDetailsCouponComponent implements OnInit, OnChanges, OnDestroy {
    @Input() form: FormGroup;
    @Input() marketingProgram: any;

    offerFields: any;
    endDate: {};
    onlyNumberMask: RegExp[];
    textMask: Mask;
    consumerSegments: ConsumerSegments[];
    expiryDatePickerOptions: IMyDpOptions;
    validityEndDatePickerOptions: IMyDpOptions;
    validityStartDatePickerOptions: IMyDpOptions;
    myDatePickerOptions: IMyDpOptions = {
        width: CalendarData.DATEPICKER_WIDTH,
        height: CalendarData.DATEPICKER_HEIGHT,
        inline: CalendarData.DATEPICKER_INLINE,
        editableDateField: CalendarData.DATEPICKER_EDIT,
        dateFormat: CalendarData.DATEPICKER_DATE_FORMAT,
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
    dialogResult: any;
    productBrandGroup: any;
    dpStartOpen: boolean = false;
    dpEndOpen: boolean = false;
    dpExpiryOpen: boolean = false;

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private datePickerValidationService: DatePickerValidationService,
        private marketingProgramStore: MarketingProgramStore,
        private maskService: MaskService,
        private consumerSegmentsStore: ConsumerSegmentsStore,
        private offerFormService: OfferFormService,
        private cd: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.onlyNumberMask = this.maskService.onlyNumberMask();
        this.textMask = this.maskService.zeroOrOneWithDecimal();
        this.validityStartDatePickerOptions = this.getCopyOfOptions();
        this.validityEndDatePickerOptions = this.getCopyOfOptions();
        this.expiryDatePickerOptions = this.getCopyOfOptions();
        this.offerFields = offerFields;
        this.form.get(this.offerFields.expiry).setValue(CalendarData.EXPIRY_FIXED);
        this.form.get(this.offerFields.requiredPurchaseQuantity).setValue(1);
        this.switchTargeted();
        this.onConsumerSegmentsStoreUpdate();
    }

    ngOnChanges(): void {
        const clippedQuantity = this.form.getRawValue()[offerFields.clippedQuantity];
        this.form.get(offerFields.subdays).setValue(this.marketingProgramStore.getReceiptSubmissionDays());
        this.form.get(offerFields.rollingExpiryDays).setValue(this.marketingProgramStore.getRollingExpirationDays());
        this.form.get(offerFields.distributionQuantity).setValidators([Validators.required, Validators.min(clippedQuantity)]);
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    isExpirySet(): boolean {
        return this.form.getRawValue()[offerFields.expiry] === CalendarData.EXPIRY_FIXED;
    }

    isRollingSet(): boolean {
        return this.form.getRawValue()[offerFields.expiry] === CalendarData.EXPIRY_ROLLING;
    }

    isTargeted(): boolean {
        return this.form.getRawValue()[offerFields.targeted];
    }

    getCopyOfOptions(): IMyDpOptions {
        return JSON.parse(JSON.stringify(this.myDatePickerOptions));
    }

    onValidityStartChanged(date: IMyInputFieldChanged): void {
        const validityStartChanged = this.datePickerValidationService.validityStartChanged(date);
        this.copyValidation(validityStartChanged);
    }

    onValidityEndChanged(date: IMyInputFieldChanged): void {
        const validityEndChanged = this.datePickerValidationService.validityEndChanged(date);
        this.copyValidation(validityEndChanged);
    }

    onValidityExpiryChanged(date: IMyInputFieldChanged): void {
        const validityExpirationChanged = this.datePickerValidationService.validityExpiryChanged(
            date,
            this.form.get(offerFields.validityEnd).value);
console.log('8888');
        console.dir(validityExpirationChanged);
        this.copyValidation(validityExpirationChanged);
    }

    copyValidation(validity: any): void {
        Object.assign(this.validityStartDatePickerOptions, validity.validityStartDatePickerOptions);
        Object.assign(this.validityEndDatePickerOptions, validity.validityEndDatePickerOptions);
        Object.assign(this.expiryDatePickerOptions, validity.expiryDatePickerOptions);
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

    resetMandatoryField(expiry: string): void {

        if (!this.isExpirySet() && !this.isRollingSet()) {
            return;
        }

        if (expiry === CalendarData.EXPIRY_FIXED) {
            this.offerFormService.toggleField(this.form, offerFields.fixedExpiryDate, offerField.enable);
        }

        if (expiry === CalendarData.EXPIRY_ROLLING) {
            this.offerFormService.resetField(this.form, offerFields.fixedExpiryDate);
        }

        this.offerFormService.resetFieldWithValue(
            this.form,
            offerFields.rollingExpiryDays,
            this.marketingProgramStore.getRollingExpirationDays());
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

    calendarExpiryToggle(state: number): void {
        state === toggleDatePicker.openDatePicker
            ? this.dpExpiryOpen = true
            : this.dpExpiryOpen = false;

        if (state === toggleDatePicker.chooseDate) {
            this.offerFormService.resetFieldWithValue(this.form, offerFields.rollingExpiryDays, 0);
        }
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
