import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Injectable()
export class FormHelpers {
    constructor() {}

    markAllTouched(control: AbstractControl): void {
        if (control.hasOwnProperty('controls')) {
            control.markAsTouched();
            const ctrl = <any>control;
            for (const inner of Object.keys(ctrl.controls)) {
                this.markAllTouched(ctrl.controls[inner] as AbstractControl);
            }
        } else {
            (<FormControl>(control)).markAsTouched();
        }
    }
}
