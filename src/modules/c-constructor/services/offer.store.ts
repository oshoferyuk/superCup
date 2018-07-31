import { FormGroup } from '@angular/forms';

export class OfferStore {
    form: FormGroup;
    offer: any = {
        coupon: {},
        sample: {}
    };

    constructor() {
    }

    updateOffer(offer: any): void {
        this.offer = Object.assign({}, offer);
        this.updateForm();
    }

    setFormForUpdates(form: FormGroup): void {
        this.form = form;
    }

    clear(): void {
        this.form = null;
        this.offer = null;
    }

    private updateForm(): void {
        if (this.form) {
            this.form.patchValue(this.offer);
        }
    }
}
