import { ListDropdownComponent } from './list-dropdown.component';
import { EventEmitter } from '@angular/core';

describe('ListDropdownComponent', () => {
    let sut;

    beforeEach(() => {
        sut = new ListDropdownComponent();

        sut.editOffer = {
            emit: jasmine.createSpy('editOffer')
        };

        sut.copyOffer = {
            emit: jasmine.createSpy('copyOffer')
        };
    });

    it('editOffer should be invoked during edit', () => {
        sut.edit();
        expect(sut.editOffer.emit).toHaveBeenCalled();
    });

    it('copyOffer should be invoked during copy', () => {
        sut.copy();
        expect(sut.copyOffer.emit).toHaveBeenCalled();
    });
});
