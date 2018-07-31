import { ControlMessageComponent } from './control-message.component';

describe('ControlMessageComponent', () => {
    let sut;
    let validatorsMessage;

    beforeEach(() => {
        validatorsMessage = {
            defaultMessage: 'Field is not valid',
            required: 'Field is required',
            onlyNumber: 'Please enter a number equal to or greater than zero.',
            highValue: 'The coupon cannot be printable and high-value',
            pattern: 'Field does not match to pattern'
        };

        sut = new ControlMessageComponent();
        sut.control = {
            invalid: false,
            touched: false,
            errors: null,
        };
        sut.validatorsMessage = validatorsMessage;
    });

    it('should check if form control has error', () => {
        sut.control = {
            invalid: true,
            touched: true,
            errors: {
                required: true,
                highValue: true,
            }
        };

        expect(sut.isHasError()).toEqual(true);
    });

    it('should not have messages if there are no errors in the form control', () => {
        expect(sut.controlMessages).toEqual(false);
    });

    it('should not have messages if there is no form control', () => {
        sut.control = null;
        expect(sut.control).toEqual(null);
    });

    it('should have an default error message if there is no message for error', () => {
        sut.control.errors = {someError: true};
        expect(sut.controlMessages).toEqual(['Field is not valid']);
    });

    it('should have an error message if there are errors in the field', () => {
        sut.control.errors = {
            required: true,
            highValue: true,
        };
        expect(sut.controlMessages).toEqual([
            'Field is required',
            'The coupon cannot be printable and high-value'
        ]);
    });

    it('should have an error for minimum value', () => {
        sut.control.errors = {
            min: {min: 5, actual: 6}
        };
        expect(sut.controlMessages).toEqual(['Minimum length 5']);
    });

    it('should have an error for maximum value', () => {
        sut.control.errors = {
            max: {max: 5, actual: 3}
        };
        expect(sut.controlMessages).toEqual(['Maximum length 5']);
    });

    it('should have an error for maximum length', () => {
        sut.control.errors = {
            maxlength: {actualLength: 20, requiredLength: 10}
        };
        expect(sut.controlMessages).toEqual(['Please enter no more than 10 characters']);
    });
});
