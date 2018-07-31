import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { MaskService } from '../../../../../core/services/validators/mask.service';
import { MarketingProgramStore } from '../../../services/marketing-program.store';
import { offerFields } from '../../form-coupon-constructor.constants';

@Component({
    selector: 'fp-offer-information-coupon',
    templateUrl: './offer-information-coupon.component.html',
    styleUrls: ['./offer-information-coupon.component.scss']
})
export class OfferInformationCouponComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
    @Input() form: FormGroup;
    @Input() marketingProgram: any;
    private oldHighValue: boolean = false;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    onlyNumberMask: RegExp[];
    onlyDecimalNumberMask: RegExp[];
    offerFields: any;
    autoCorrectedCouponValue: any = this.setCorrectCouponValue();

    constructor(
        private marketingProgramStore: MarketingProgramStore,
        private cd: ChangeDetectorRef,
        private maskService: MaskService) {
    }

    ngOnInit(): void {
        this.onlyNumberMask = this.maskService.onlyNumberMask();
        this.onlyDecimalNumberMask = this.maskService.onlyDecimalNumberMask();
        this.switchPrintable();
        this.offerFields = offerFields;
        setTimeout(() => this.afterParentInit());
    }

    ngAfterViewInit(): void {
        this.handleAction();
        this.cd.detectChanges();
    }

    setCorrectCouponValue(): object {
        return (conformedValue) => {
            let newValue: string;
            const hasDot: number = conformedValue.indexOf('.');

            if (conformedValue.length && hasDot === -1) {
                newValue = parseFloat(conformedValue).toFixed(2);
            }

            return {
                value: newValue || conformedValue
            };
        };
    }

    ngOnChanges(): void {
        // Once multi language support is implemented, values should be taken from this.marketingProgram.languages
        this.form.controls[offerFields.language].setValue('EN');
        this.form.controls[offerFields.currency].setValue(this.marketingProgram.country.currencyCode);
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    isPrintable(): boolean {
        return this.form.getRawValue()[offerFields.printable];
    }

    isHighValue(): boolean {
        return this.form.getRawValue()[offerFields.highValue];
    }

    switchPrintable(): void {
        const eanNumber = this.form.get(offerFields.eanNumber);
        const offerPrintingHouseID = this.form.get(offerFields.offerPrintingHouseID);
        const printableCouponImage = this.form.get(offerFields.printableCouponImage);
        if (!this.isPrintable()) {
            eanNumber.reset();
            eanNumber.disable();
            offerPrintingHouseID.reset();
            offerPrintingHouseID.disable();
            printableCouponImage.reset();
            printableCouponImage.disable();
        } else {
            eanNumber.enable();
            offerPrintingHouseID.enable();
            printableCouponImage.enable();
        }
    }

    productImageUploaded(url: string): void {
        this.form.controls[offerFields.productImage].setValue(url);
    }

    productImageMaxSizeExceed(): void {
        this.form.get(offerFields.productImage).setValue('');
        this.form.get(offerFields.productImage).setErrors({maxSize: true});
        this.form.get(offerFields.productImage).markAsTouched();
    }

    productPrintMaxSizeExceed(): void {
        this.form.get(offerFields.printableCouponImage).setValue('');
        this.form.get(offerFields.printableCouponImage).setErrors({maxSize: true});
        this.form.get(offerFields.printableCouponImage).markAsTouched();
    }

    printableCouponImageUploaded(url: string): void {
        this.form.controls[offerFields.printableCouponImage].setValue(url);
    }

    private afterParentInit(): void {
        this.subscribeToForm();
    }

    private subscribeToForm(): void {
        this.form.controls[offerFields.couponValue]
            .valueChanges
            .takeUntil(this.ngUnsubscribe)
            .subscribe(() => {
                this.handleAction();
            });

        this.form.controls[offerFields.printable]
            .valueChanges
            .takeUntil(this.ngUnsubscribe)
            .subscribe(() => {
                this.handleAction();
            });

        this.form.controls[offerFields.highValue]
            .valueChanges
            .takeUntil(this.ngUnsubscribe)
            .subscribe((isHighValue) => {
                if (isHighValue === this.oldHighValue) {
                    return;
                }
                this.oldHighValue = isHighValue;
                isHighValue
                    ? this.form.controls[offerFields.printable].disable()
                    : this.form.controls[offerFields.printable].enable();
            });
    }

    private handleAction(): void {

        const couponValue = this.form.get(offerFields.couponValue);
        const printableControl = this.form.get(offerFields.printable);
        const minimumPurchasePrice = this.form.get(offerFields.minimumPurchasePrice);

        if (couponValue.value) {
            couponValue.setErrors(null);
        }

        if (!printableControl.value) {
            if (this.couponIsHighValue()) {
                this.form.get(offerFields.highValue).setValue(true);
                minimumPurchasePrice.enable();
            } else {
                this.form.get(offerFields.highValue).setValue(false);
                minimumPurchasePrice.reset();
                minimumPurchasePrice.disable();
            }
        } else {
            if (this.couponIsHighValue()) {
                couponValue.setErrors({highValue: true});
            }
            minimumPurchasePrice.reset();
            minimumPurchasePrice.disable();
        }
    }

    private couponIsHighValue(): boolean {
        const couponValueControl = this.form.controls[offerFields.couponValue];
        const marketingProgram = this.marketingProgramStore.getSelectedMarketingProgram();
        const originHighValue = marketingProgram.highValueThreshold || 0;
        const couponValue = parseFloat(couponValueControl.value) || 0;
        return originHighValue && couponValue >= originHighValue;
    }
}
