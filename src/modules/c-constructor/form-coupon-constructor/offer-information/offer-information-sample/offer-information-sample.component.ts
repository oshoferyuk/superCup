import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MaskService } from '../../../../../core/services/validators/mask.service';
import { offerFields } from '../../form-coupon-constructor.constants';

@Component({
    selector: 'fp-offer-information-sample',
    templateUrl: './offer-information-sample.component.html',
    styleUrls: ['./offer-information-sample.component.scss']
})
export class OfferInformationSampleComponent implements OnInit, OnChanges {
    @Input() form: FormGroup;
    @Input() sampleValues: any;
    @Input() marketingProgram: any;
    onlyNumberMask: RegExp[];
    offerFields: any;

    constructor(private maskService: MaskService) { }

    ngOnInit(): void {
        this.onlyNumberMask = this.maskService.onlyNumberMask();
        this.offerFields = offerFields;
    }

    ngOnChanges(): void {
        // Once multi language support is implemented, values should be taken from this.marketingProgram.languages
        this.form.controls[offerFields.language].setValue('EN');
    }

    productImageUploaded(url: string): void {
        this.form.controls[offerFields.productImage].setValue(url);
    }

    productImageMaxSizeExceed(): void {
        this.form.get(offerFields.productImage).setErrors({maxSize: true});
        this.form.get(offerFields.productImage).markAsTouched();
    }
}
