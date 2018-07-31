import { FormHelpers } from './form-helpers';

describe('FormHelpers', () => {
    let sut;

    beforeEach(() => {
        sut = new FormHelpers();
    });

    describe('mark all as touched', () => {
        let control;
        let nestedControl;

        beforeEach(() => {
            nestedControl = {markAsTouched: jasmine.createSpy('markAsTouched')};

            control = {
                markAsTouched: jasmine.createSpy('markAsTouched'),
                controls: {
                    nestedControl
                }
            };
        });

        beforeEach(() => {
            sut.markAllTouched(control);
        });

        it('should mark parent control as touched', () => {
            expect(control.markAsTouched).toHaveBeenCalled();
        });

        it('should mark nested control as touched', () => {
            expect(nestedControl.markAsTouched).toHaveBeenCalled();
        });
    });
});
