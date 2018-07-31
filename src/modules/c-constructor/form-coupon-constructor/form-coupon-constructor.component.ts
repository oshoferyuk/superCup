import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DoCheck,
    Input,
    OnInit,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OfferFormService } from '../services/offer-form.service';
import { offerStatuses, publishedStatuses } from '../submit-form-coupon-constructor/offer-statuses.constants';
import { offerFields, offerTabTypes, offerTypes } from './form-coupon-constructor.constants';
import { ProductSelectorService } from './product-selector/services/product-selector.service';

@Component({
    selector: 'fp-form-coupon-constructor',
    templateUrl: './form-coupon-constructor.component.html',
    styleUrls: ['./form-coupon-constructor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class FormCouponConstructorComponent implements OnInit, DoCheck, AfterViewInit {
    @Input() form: FormGroup;
    @Input() sampleValues: any;
    @Input() marketingProgram: any;
    @Input() consumerSegments: any;

    offerFields: any;
    formTypeActive: string;
    formGroupActive: string;
    currentStatus: string;

    formtypes: string[] = [offerTypes.coupon, offerTypes.sample];
    offerTabTypes: { offerInformation: string; distributionDetails: string };

    constructor(private offerFormService: OfferFormService,
                private cd: ChangeDetectorRef,
                private productSelectorService: ProductSelectorService,
                private viewContainerRef: ViewContainerRef) {
    }

    ngOnInit(): void {
        this.offerTabTypes = offerTabTypes;
        this.setOfferInfoFormGroupActive();
        this.formTypeActive = this.form.get(offerFields.type).value;
        this.offerFields = offerFields;
    }

    ngAfterViewInit(): void {
        this.disableFieldsAccordingToStatus(this.form.getRawValue());
    }

    ngDoCheck(): void {
        if (this.form['submitted']) { // TODO VN think about better solution
            this.cd.markForCheck();
        }

        const formValue = this.form.getRawValue();
        if (this.currentStatus === formValue.status) {
            return;
        } else {
            this.currentStatus = formValue.status;
        }
    }

    setOfferInfoFormGroupActive(): void {
        this.formGroupActive = offerTabTypes.offerInformation;
        this.cd.markForCheck();
    }

    setDistributionDetailsFormActive(): void {
        this.formGroupActive = offerTabTypes.distributionDetails;
        this.cd.markForCheck();
    }

    isOfferInfoFormGroupActive(): boolean {
        return this.formGroupActive === offerTabTypes.offerInformation;
    }

    isDistributionDetailsFormActive(): boolean {
        return this.formGroupActive === offerTabTypes.distributionDetails;
    }

    onSwitchTypeClick(event: MouseEvent, type: string): void {
        this.productSelectorService.resetData();

        if (this.isCurrentType(type)) {
            return;
        }

        if (this.isFormPristine()) {
            this.setOfferType(type);
            return;
        }

        this.switchType(event, type);
    }

    getActiveForm(): string {
        return this.formGroupActive;
    }

    private setOfferType(type: string): void {
        const currentType = this.form.get(offerFields.type);
        currentType.setValue(type);
        this.formTypeActive = type;
        this.cd.markForCheck();
    }

    private disableFieldsAccordingToStatus(formValue: FormGroup): void {
        if (formValue.status === <string>offerStatuses.deleted) {
            this.form.disable();
            return;
        }

        if (publishedStatuses.indexOf(formValue.status) >= 0) {
            const type = formValue[offerFields.type];
            const currentForm = this.form.get(type);
            this.form.disable();
            currentForm.get(offerFields.distributionQuantity) && currentForm.get(offerFields.distributionQuantity).enable();
            currentForm.get(offerFields.validityEnd) && currentForm.get(offerFields.validityEnd).enable();
            currentForm.get(offerFields.fixedExpiryDate) && currentForm.get(offerFields.fixedExpiryDate).enable();
            return;
        }
    }

    private isCurrentType(type: string): boolean {
        return type === this.formTypeActive;
    }

    private isFormPristine(): boolean {
        return (!this.form.get(offerFields.id).value) &&
            (this.form.get(this.formTypeActive).pristine);
    }

    private switchType(event: MouseEvent, type: string): void {
        event.preventDefault();

        this.offerFormService.showSwitchTypeDialog(this.viewContainerRef)
            .subscribe(() => {
                this.setOfferType(type);
                this.offerFormService.resetForm(this.form);
            });
    }
}
