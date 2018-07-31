import { Injectable, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coupon } from '../../../core/models/offer/coupon.model';
import { Sample } from '../../../core/models/offer/sample.model';
import { offerFields, offerTypes } from '../form-coupon-constructor/form-coupon-constructor.constants';
import { offerStatuses } from '../submit-form-coupon-constructor/offer-statuses.constants';
import { OfferStore } from './offer.store';
import { Observable } from 'rxjs/Observable';
import { DialogOptions } from '../../../core/dialog/dialog-options.model';
import { DialogService } from '../../../core/dialog/dialog.service';
import { offerField } from './offer-form.constants';

@Injectable()
export class OfferFormService {

    constructor(private fb: FormBuilder,
                private offerStore: OfferStore,
                private dialogService: DialogService) {
    }

    createForm(): FormGroup {
        return this.fb.group({
            [offerFields.id]: null,
            [offerFields.status]: offerStatuses.dataNeeded,
            [offerFields.type]: offerTypes.coupon,
            [offerTypes.coupon]: this.createCouponForm(),
            [offerTypes.sample]: this.createSampleForm()
        });
    }

    updateForm(offer: Coupon | Sample, form: FormGroup): void {
        if (offer) {
            this.resetForm(form);
            this.updateFormWithOffer(offer);
        } else {
            this.resetForm(form);
        }
    }

    resetForm(form: FormGroup): void {
        const type = form.get(offerFields.type).value;
        form['submitted'] = null;
        form.reset({
            [offerFields.type]: type,
            [offerFields.status]: offerStatuses.dataNeeded
        });
        form.get(offerTypes.coupon).markAsPristine();
        form.get(offerTypes.sample).markAsPristine();
    }

    resetField(form: FormGroup, fieldName: string): void {
        const field = form.get(fieldName);
        field.reset(null);
        field.disable();
    }

    resetFieldWithValue(form: FormGroup, fieldName: string, value: number): void {
        const field = form.get(fieldName);
        if (value !== 0) {
            field.reset(value);
            field.enable();

        } else {
            field.reset(null);
            field.disable();
        }
    }

    toggleField(form: FormGroup, fieldName: string, toggle: string): void {

        const field = form.get(fieldName);

        if (toggle === offerField.enable) {
            field.enable();
        }

        if (toggle === offerField.disable) {
            field.disable();
        }
    }

    convertResponseToForm(offer: Coupon | Sample, type: string): void {
        this.convertDateToFormFormat(offer);

        this.offerStore.updateOffer(
            this.prepareResponseOffer(offer, type)
        );
    }

    showSwitchTypeDialog(viewContainerRef: ViewContainerRef): Observable<any> {
        const dialogOptions = new DialogOptions();
        dialogOptions.options = {
            message: 'offer.dialogs.switchType.message',
            ok: 'buttons.create',
            cancel: 'buttons.cancel'
        };

        return this.dialogService.confirm(viewContainerRef, dialogOptions)
            .filter(result => result);
    }

    private updateFormWithOffer(offer: Coupon | Sample): void {
        const type = offer.type && offer.type.toLowerCase();
        this.convertResponseToForm(offer, type);
    }

    private prepareResponseOffer(offer: Coupon | Sample, type: string): object {
        return {
            type,
            [type]: offer,
            id: offer.id,
            status: offer.status
        };
    }

    private convertDateToFormFormat(formOffer: Coupon | Sample): void {
        formOffer[offerFields.validityStart] = this.getDateToFormFormat(formOffer[offerFields.validityStart]);
        formOffer[offerFields.validityEnd] = this.getDateToFormFormat(formOffer[offerFields.validityEnd]);
        formOffer[offerFields.fixedExpiryDate] = this.getDateToFormFormat(formOffer[offerFields.fixedExpiryDate]);
    }

    private getDateToFormFormat(formField: any): Object {
        if (!!formField) {
            const [formatted] = formField.split('T');
            let [year, month, day] = formatted.split('-');
            day = +day;
            month = +month;
            year = +year;
            return {formatted, date: {day, month, year}};
        }
    }

    private createCouponForm(): FormGroup {
        return this.fb.group(this.getCouponFormGroup());
    }

    private createSampleForm(): FormGroup {
        return this.fb.group(this.getSampleFormGroup());
    }

    private getCouponFormGroup(): any {
        return {
            [offerFields.id]: null,
            [offerFields.type]: offerTypes.coupon,
            [offerFields.marketingProgram]: null,
            [offerFields.language]: null,
            [offerFields.currency]: null,
            [offerFields.printable]: [{value: null, disabled: false}, Validators.required],
            [offerFields.offerPrintingHouseID]: [{value: null}, Validators.required],
            [offerFields.eanNumber]: [{value: null}, Validators.required],
            [offerFields.highValue]: [{value: null, disabled: true}],
            [offerFields.minimumPurchasePrice]: [{value: null}, Validators.required],
            [offerFields.ncnCode]: null,
            [offerFields.couponValue]: [{value: null}, Validators.required],
            [offerFields.offerDescription]: [
                {value: null},
                [
                    Validators.required,
                    Validators.maxLength(100)
                ]
            ],
            [offerFields.productBrandGroup]: [{value: null, disabled: true}, Validators.required],
            [offerFields.offerSummary]: [
                {value: null},
                [
                    Validators.required,
                    Validators.maxLength(1000)
                ]
            ],
            [offerFields.productImage]: [{value: null}, Validators.required],
            [offerFields.printableCouponImage]: [{value: null}, Validators.required],

            [offerFields.expiry]: null,
            [offerFields.validityStart]: [{value: null}, Validators.required],
            [offerFields.validityEnd]: [{value: null}, Validators.required],
            [offerFields.fixedExpiryDate]: [{value: null}, Validators.required],
            [offerFields.rollingExpiryDays]: [{value: null}, Validators.required],
            [offerFields.targeted]: null,
            [offerFields.targetConsumerSegments]: [{value: null}, Validators.required],
            [offerFields.subdays]: [{value: null}, Validators.required],
            [offerFields.requiredPurchaseQuantity]: [{value: null}, Validators.required],
            [offerFields.redemptionRate]: [
                {value: null},
                [
                    Validators.required,
                    Validators.min(0),
                    Validators.max(1)
                ]
            ],
            [offerFields.budgetName]: [{value: null}, Validators.required],
            [offerFields.budgetIONumber]: [{value: null}, Validators.required],
            [offerFields.distributionQuantity]: [{value: null}, Validators.required],
            [offerFields.purchaseGtins]: [{value: null}, Validators.required],
            [offerFields.selectedProductsSummary]: null,
            [offerFields.validityStartTime]: null,
            [offerFields.validityEndTime]: null,
            [offerFields.clippedQuantity]: null,
            [offerFields.incentiveId]: null,
            [offerFields.itemUuids]: [],
            [offerFields.lastCatalogLevel]: '',
        };
    }

    private getSampleFormGroup(): any {
        return {
            [offerFields.id]: null,
            [offerFields.type]: offerTypes.sample,
            [offerFields.marketingProgram]: null,
            [offerFields.language]: null,
            [offerFields.currency]: null,
            [offerFields.sampleValue]: [{value: null}, Validators.required],
            [offerFields.offerDescription]: [
                {value: null},
                [
                    Validators.required,
                    Validators.maxLength(100)
                ]
            ],
            [offerFields.productBrandGroup]: [{value: null, disabled: true}, Validators.required],
            [offerFields.offerSummary]: [
                {value: null},
                [
                    Validators.required,
                    Validators.maxLength(1000)
                ]
            ],
            [offerFields.productImage]: [{value: null}, Validators.required],

            [offerFields.validityStart]: [{value: null}, Validators.required],
            [offerFields.validityStartTime]: null,
            [offerFields.validityEnd]: [{value: null}, Validators.required],
            [offerFields.validityEndTime]: null,
            [offerFields.targeted]: null,
            [offerFields.targetConsumerSegments]: [{value: null}, Validators.required],
            [offerFields.redemptionRate]: [
                {value: null},
                [
                    Validators.required,
                    Validators.min(0),
                    Validators.max(1)
                ]
            ],
            [offerFields.budgetName]: null,
            [offerFields.budgetIONumber]: null,
            [offerFields.distributionQuantity]: [{value: null}, Validators.required],
            [offerFields.samplePartNumber]: [{value: null}, Validators.required],
            [offerFields.selectedProductsSummary]: null,
            [offerFields.clippedQuantity]: null,
            [offerFields.incentiveId]: null,
            [offerFields.lineOfBusiness]: [{value: null}, Validators.required],
            [offerFields.itemUuids]: [],
            [offerFields.lastCatalogLevel]: '',
            [offerFields.purchaseGtins]: [{value: null}, Validators.required],
        };
    }
}
