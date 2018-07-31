import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { isUndefined } from 'util';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputSwitcherComponent),
    multi: true
};

@Component({
    selector: 'fp-input-switcher',
    templateUrl: './input-switcher.component.html',
    styleUrls: ['./input-switcher.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputSwitcherComponent implements ControlValueAccessor { // TODO Should be tested
    @Input('value') _value: boolean = false;
    @Input() fpTooltipText: string;
    @Input() disabled: boolean = false;
    @Input() label: string = '';

    onChange: any = () => {};
    onTouched: any = () => {};

    get value(): any {
        return this._value;
    }

    set value(val: any) {
        this._value = val;
        this.onChange(val);
        this.onTouched();
    }

    registerOnChange(fn: void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: void): void {
        this.onTouched = fn;
    }

    writeValue(value: boolean): void {
        if (!isUndefined(value)) {
            this.value = value;
        }
    }

    setSwitchState(): void {
        if (this.disabled) {
            return;
        }
        this.value = !this.value;
    }

    setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }
}
