import { Component, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR,  NG_VALIDATORS, ControlValueAccessor } from '@angular/forms';

import { Helpers } from '../../helpers/helpers';
import { isNullOrUndefined } from 'util';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultipleSelectComponent),
    multi: true
};

export const CUSTOM_INPUT_VALIDATORS: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MultipleSelectComponent),
    multi: true
};

@Component({
    selector: 'fp-multiple-select',
    templateUrl: './multiple-select.component.html',
    styleUrls: ['./multiple-select.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_VALIDATORS]
})
export class MultipleSelectComponent implements ControlValueAccessor { // TODO Should be tested
    @Input('value') _value: any = [];
    @Input() data: any = [];
    @Input() disabled: boolean;
    @Input() optionName: string;
    @Input() placeholder: string = '';
    @Input() optionKey: string;

    selectedData: any = [];

    onChange: any = () => {};
    onTouched: any = () => {};
    validateFn: any = () => {};

    get value(): any {
        return this._value;
    }

    set value(value: any) {
        const key = this.optionKey;
        const selectedValue = key && value.find(el => typeof el === 'object')
            ? value.map(el => el[key])
            : value;

        this._value = selectedValue;
        this.onChange(selectedValue);
        this.onTouched();
    }

    constructor(private helpers: Helpers) { }

    registerOnChange(fn: void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: void): void {
        this.onTouched = fn;
    }

    writeValue(value: any): void {
        this.setSelectedList();
        if (value) {
            this.value = value;
            this.setSelectedData(value);
        }
    }

    setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }

    setSelectedData(value: any): void {
        let selectedData = this.optionKey
            ? this.helpers.findByKeysInObjectArray(value, this.data, this.optionKey)
            : value;
        if (isNullOrUndefined(selectedData && selectedData[0])) {
            selectedData = [];
        }
        this.selectedData = this.helpers.objectKeyTransform(selectedData, this.optionName, 'text');
    }

    setSelectedList(): void {
        this.data = this.helpers.objectKeyTransform(this.data, this.optionName, 'text');
    }

    onDataChange(value: any): void {
        const selected = this.data
            .filter(item => value.some(obj => obj.id === item.id));

        this.helpers.objectKeyTransform(selected, 'text', this.optionName);
        this.value = selected;
    }

    validate(c: FormControl): void {
        return this.validateFn(c);
    }
}
