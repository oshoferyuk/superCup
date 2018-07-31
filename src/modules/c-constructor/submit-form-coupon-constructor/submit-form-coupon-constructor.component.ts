import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { mainRouting } from '../../main/main-routing.constants';
import { CalendarData, offerFields } from '../form-coupon-constructor/form-coupon-constructor.constants';
import { MarketingProgramStore } from '../services/marketing-program.store';
import { OfferFormService } from '../services/offer-form.service';
import { offerStatuses, publishedStatuses, saveDraftStatuses } from './offer-statuses.constants';
import { SubmitFormOfferService } from './submit-form-offer.service';
import { FormHelpers } from '../../../core/helpers/form-helpers';

@Component({
    selector: 'fp-submit-form-coupon-constructor',
    templateUrl: './submit-form-coupon-constructor.component.html',
    styleUrls: ['./submit-form-coupon-constructor.component.scss'],
    providers: [SubmitFormOfferService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmitFormCouponConstructorComponent implements OnInit, OnDestroy {
    @Input() form: FormGroup;
    @Input() timeStamp: string;
    readonly timeStampFormat: string = 'YYYY-MM-DD hh:mm:ss A';
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private submitFormOfferService: SubmitFormOfferService,
                private offerFormService: OfferFormService,
                private marketingProgramStore: MarketingProgramStore,
                private cd: ChangeDetectorRef,
                private router: Router,
                private formHelpers: FormHelpers) {
    }

    ngOnInit(): void {
        this.form
            .valueChanges
            .takeUntil(this.ngUnsubscribe)
            .subscribe(() => {
                this.cd.markForCheck();
            });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    saveDraft(): void {
        const formOffer = this.getFormByType();
        this.submitFormOfferService
            .submitOffer(this.prepareOffer(formOffer))
            .takeUntil(this.ngUnsubscribe)
            .subscribe((offer) => {
                this.timeStamp = !!offer.updatedTimestamp ? offer.updatedTimestamp : 'N/A';
                this.offerFormService.convertResponseToForm(offer, formOffer[offerFields.type]);
            });
    }

    publishOffer(): void {
        const type = this.getType();
        const status = this.form.get(type).status;

        if (status === 'VALID') {
            const formOffer = this.getFormByType();
            this.submitFormOfferService
                .publishOffer(this.prepareOffer(formOffer))
                .takeUntil(this.ngUnsubscribe)
                .subscribe(() => this.router.navigate([mainRouting.campaign]));
            return;
        }
        this.form['submitted'] = true;
        this.formHelpers.markAllTouched(this.form);
    }

    disableOffer(): void {
        const formOffer = this.getFormByType();
        this.submitFormOfferService
            .disableOffer(this.prepareOffer(formOffer))
            .takeUntil(this.ngUnsubscribe)
            .subscribe((offer) => {
                this.timeStamp = !!offer.updatedTimestamp ? offer.updatedTimestamp : 'N/A';
                this.offerFormService.convertResponseToForm(offer, formOffer[offerFields.type]);
            });
    }

    deleteOffer(): void {
        const formOffer = this.getFormByType();

        this.submitFormOfferService.showDeleteDialog()
            .flatMap(() => this.submitFormOfferService.deleteOffer(this.prepareOffer(formOffer)))
            .takeUntil(this.ngUnsubscribe)
            .subscribe(() => this.router.navigate([mainRouting.campaign]));
    }

    getStatus(): string {
        const formValue = this.form.getRawValue();
        return formValue && formValue.status;
    }

    isCurrentFormInvalid(): boolean {
        const type = this.getType();
        const currentForm = this.form.get(type);

        console.log(Object.keys(currentForm['controls']).filter(key => currentForm['controls'][key].invalid));

        return this.form['submitted'] && currentForm.invalid;
    }

    isPublishDisabled(): boolean {
        if (this.isCurrentFormInvalid()) {
            return true;
        }

        return [
            <string>offerStatuses.created,
            ...publishedStatuses
        ].indexOf(this.getStatus()) < 0;
    }

    isDisableDisabled(): boolean {
        return publishedStatuses.indexOf(this.getStatus()) < 0;
    }

    isSaveDraftDisabled(): boolean {
        return saveDraftStatuses.indexOf(this.getStatus()) < 0;
    }

    isDeleteDisabled(): boolean {
        return !(this.form
            && this.form.get(offerFields.id)
            && this.form.get(offerFields.id).value)
            || this.isSaveDraftDisabled();
    }

    isTimeStampDate(): boolean {
        return !!Date.parse(this.timeStamp);
    }

    private prepareOffer(formOffer: any): object {
        return Object.assign(
            {},
            formOffer,
            {
                [offerFields.marketingProgram]: this.marketingProgramStore.getId(),
                estimatedRedemptionRate: formOffer.estimatedRedemptionRate
                    && formOffer.estimatedRedemptionRate.toString().replace(/\s/g, '')
            },
            this.convertDate(formOffer)
        );
    }

    private convertDate(formOffer: any): object {
        const dateFields = {};
        const startTime = CalendarData.VALIDITY_START_MS_TIME + this.marketingProgramStore.getTimezone();
        const endTime = CalendarData.VALIDITY_END_MS_TIME + this.marketingProgramStore.getTimezone();
        dateFields[offerFields.validityStart] = formOffer[offerFields.validityStart]
            ? `${formOffer[offerFields.validityStart].formatted}T${CalendarData.VALIDITY_START_TIME}.${startTime}`
            : null;
        dateFields[offerFields.validityEnd] = formOffer[offerFields.validityEnd]
            ? `${formOffer[offerFields.validityEnd].formatted}T${CalendarData.VALIDITY_END_TIME}.${endTime}`
            : null;
        dateFields[offerFields.fixedExpiryDate] = formOffer[offerFields.fixedExpiryDate]
            ? `${formOffer[offerFields.fixedExpiryDate].formatted}T${CalendarData.VALIDITY_END_TIME}.${endTime}`
            : null;

        return dateFields;
    }

    private getFormByType(): any {
        const formValue = this.form.getRawValue();
        const type = formValue[offerFields.type];
        const id = formValue[offerFields.id];
        const formByType = formValue && formValue[type];
        return Object.assign(formByType, {id, type});
    }

    private getType(): string {
        return this.form.get([offerFields.type]).value;
    }
}
