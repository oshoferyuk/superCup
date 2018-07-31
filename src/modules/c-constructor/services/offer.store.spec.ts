
import { OfferStore } from './offer.store';

describe('OfferStore', () => {
    let sut;
    let form;
    let offer;

    beforeEach(() => {
        form = {
            patchValue: jasmine.createSpy('patchValue')
        };
        offer = {
            sample: Symbol('sample'),
            coupon: Symbol('coupon')
        };

        sut = new OfferStore();
        sut.setFormForUpdates(form);
    });

    it('should set form for updates', () => {
        expect(sut.form).toEqual(form);
    });

    describe('clear', () => {
        beforeEach(() => {
            sut.clear();
        });

        it('should clear form', () => {
            expect(sut.form).toEqual(null);
        });

        it('should clear stored offer', () => {
            expect(sut.offer).toEqual(null);
        });
    });

    describe('when updated', () => {
        beforeEach(() => {
            sut.updateOffer(offer);
        });

        it('should update form', () => {
            expect(sut.form.patchValue).toHaveBeenCalledWith(offer);
        });

        it('should clear stored offer', () => {
            expect(sut.offer).toEqual(offer);
        });
    });
});
