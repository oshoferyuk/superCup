import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { offerFields } from '../form-coupon-constructor/form-coupon-constructor.constants';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'fp-ids-info-coupon-constructor',
    templateUrl: './ids-info-coupon-constructor.component.html',
    styleUrls: ['./ids-info-coupon-constructor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdsInfoCouponConstructorComponent implements OnInit {
    @Input() form: FormGroup;

    constructor(private cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.form
            .get(offerFields.id)
            .valueChanges
            .subscribe(() => this.cd.markForCheck());
    }

    getId(): string {
        const formValue = this.form.getRawValue();
        return formValue && formValue.id;
    }

    getIncentiveId(): string {
        const formValue = this.form.getRawValue();
        const currentForm = formValue[formValue[offerFields.type]];
        return currentForm && currentForm[offerFields.incentiveId];
    }
}
