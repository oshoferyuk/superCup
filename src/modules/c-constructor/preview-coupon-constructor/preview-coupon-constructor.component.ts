import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { autoUnsubscribe as AutoUnsubscribe  } from '../../../core/decorators/.';
import { Subscription } from 'rxjs/Subscription';
import { offerFields } from '../form-coupon-constructor/form-coupon-constructor.constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'fp-preview-coupon-constructor',
    templateUrl: './preview-coupon-constructor.component.html',
    styleUrls: ['./preview-coupon-constructor.component.scss']
})
@AutoUnsubscribe()
export class PreviewCouponConstructorComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() marketingProgram: any;

    private sub: Subscription[] = [];
    ncnCode: number;
    eanNumber: number;
    couponValue: string;
    productImage: string;
    printableCouponImage: string;
    offerDescription: string;
    isWebView: boolean = true;
    offerType: string;
    printable: boolean;

    constructor(
        private translate: TranslateService
    ) { }

    ngOnInit(): void {
        const sub = this.form
            .valueChanges
            .subscribe(() => {
                const formVal = this.form.getRawValue();
                this.ncnCode = formVal[formVal.type][offerFields.ncnCode];
                this.eanNumber = formVal[formVal.type][offerFields.eanNumber];
                this.couponValue = this.getCouponValue(formVal);
                this.productImage = formVal[formVal.type][offerFields.productImage];
                this.offerDescription = formVal[formVal.type][offerFields.offerDescription];
                this.offerType = `offer.preview.${formVal.type}`;
                this.printable = formVal[formVal.type][offerFields.printable];
                this.printableCouponImage = formVal[formVal.type][offerFields.printableCouponImage];
                this.triggerPreview();
            });
        this.sub.push(sub);
    }

    private getCouponValue(formVal: any): string {
        let value = '';
        const currencyCode = this.marketingProgram.country.currencyCode;
        const currencySymbol = this.translate.instant(`marketingProgram.currency.${currencyCode}`);
        const couponValue = formVal[formVal.type][offerFields.couponValue];
        const sampleValue = formVal[formVal.type][offerFields.sampleValue];

        if (couponValue) {
            value = `${currencySymbol} ${couponValue} OFF`;
        } else if (sampleValue) {
            value = this.translate.instant(`offer.sampleValues.${sampleValue}`);
        }

        return value;
    }

    private triggerPreview(): void {
        if (!this.printable) {
            this.isWebView = true;
        }
    }

    setWebPreview(): void {
        if (!this.isWebView) {
            this.isWebView = true;
        }
    }

    setPrintablePreview(): void {
        if (this.isWebView) {
            this.isWebView = false;
        }
    }

    toggleMetaData(): boolean {
        return this.printable && !this.isWebView;
    }

}
