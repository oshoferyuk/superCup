import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'fp-control-message',
    templateUrl: './control-message.component.html',
    styleUrls: ['./control-message.component.scss']
})
export class ControlMessageComponent {
    @Input() control: FormControl = null;

    validatorsMessage: {} = {
        defaultMessage: 'Field is not valid',
        required: 'Field is required',
        onlyNumber: 'Please enter a number equal to or greater than zero.',
        highValue: 'The coupon cannot be printable and high-value',
        pattern: 'Field does not match to pattern',
        maxSize: 'Please upload images with a maximum size of 10 MB.'
    };

    constructor() {}

    isHasError(): boolean {
        return this.control.invalid &&
               this.control.touched &&
               !!this.controlMessages.length;
    }

    get controlMessages(): any {
        const control = this.control;
        if (!control || !control.errors) {
            return false;
        }

        const errors = [];

        if (control.errors.hasOwnProperty('min')) {
            this.validatorsMessage['min'] = `Minimum length ${ control.errors.min.min}`;
        }
        if (control.errors.hasOwnProperty('max')) {
            this.validatorsMessage['max'] = `Maximum length ${ control.errors.max.max}`;
        }
        if (control.errors.hasOwnProperty('maxlength')) {
            this.validatorsMessage['maxlength'] = `Please enter no more than ${control.errors.maxlength.requiredLength} characters`;
        }

        Object.keys(control.errors).forEach((error: string) => {
            if (this.validatorsMessage[error]) {
                errors.push(this.validatorsMessage[error]);
            } else {
                errors.push(this.validatorsMessage['defaultMessage']);
            }
        });
        return errors;
    }
}
