import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'fp-form-control',
    templateUrl: './form-control.component.html',
    styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent implements OnInit {
    @Input() label: string = '';
    @Input() italicLabel?: boolean;
    @Input() alignItems: string;
    @Input() tooltipLabel: string;
    @Input() control: FormControl;
    @Input() required: boolean = false;

    labelTranslate?: string;
    controlValue: string;

    constructor() { }

    ngOnInit(): void {
        if (this.label) {
            this.labelTranslate = `labels.${this.label}`;
        }

        this.controlValue = this.getControlValue(this.control);
    }

    private getControlValue(control: FormControl): string {
        return control ? control.value : '';
    }
}
