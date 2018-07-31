import { OfferSelectionService } from './offer-selection.service';

describe('OfferSelectionService', () => {
    let sut;
    let offer;
    let printableOffer;

    beforeEach(() => {
        offer = {id: 123};
        printableOffer = {id: 2, printable: true};

        sut = new OfferSelectionService();
    });

    describe('selection', () => {

        beforeEach(() => {
            sut.selectedOffers = {};
        });

        it('should add offer to selected', () => {
            sut.select(offer);
            expect(sut.selectedOffers).toEqual({[offer.id]: offer});
        });

        it('should delete selected', () => {
            sut.select(offer);
            sut.deselect(offer.id);
            expect(sut.selectedOffers).toEqual({});
        });

        it('should clear selected', () => {
            sut.select(offer);
            sut.clearAll();
            expect(sut.selectedOffers).toEqual({});
        });

        it('should check selection', () => {
            sut.select(offer);
            expect(sut.isSelected(offer.id)).toBeTruthy();
        });

        it('should select all', () => {
            sut.selectAll([offer, printableOffer]);
            expect(sut.selectedOffers).toEqual({
                [offer.id]: offer,
                [printableOffer.id]: printableOffer
            });
        });

        it('should deselect all', () => {
            sut.select(offer);
            sut.select(printableOffer);
            sut.deselectAll([offer, printableOffer]);
            expect(sut.selectedOffers).toEqual({});
        });

        describe('is all selected', () => {
            it('should be false if not all offers selected', () => {
                sut.select(offer);
                expect(sut.isAllSelected([offer, printableOffer])).toBeFalsy();
            });

            it('should be true if all offers selected', () => {
                sut.select(offer);
                sut.select(printableOffer);
                expect(sut.isAllSelected([offer, printableOffer])).toBeTruthy();
            });
        });


        describe('get selected printable offer ids', () => {
            beforeEach(() => {
                sut.select(offer);
            });

            it('should get no ids if not printable offers', () => {
                expect(sut.getSelectedPrintableOfferIds()).toEqual([]);
            });

            it('should get selected printable offer ids', () => {
                sut.select(printableOffer);
                expect(sut.getSelectedPrintableOfferIds()).toEqual(['2']);
            });
        })
    });
});
