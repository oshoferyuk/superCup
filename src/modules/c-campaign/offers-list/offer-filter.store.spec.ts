import { OfferFilterStore } from './offer-filter.store';
import { SelectedFilters } from './models/filters.model';

describe('OfferFilterStore', () => {
    let sut;
    let type = 'type1';
    let collection;
    let selectedFilers;
    const item = Symbol('item');

    beforeEach(() => {
        selectedFilers = new SelectedFilters();
        collection = new Set<any>();
        collection.add(item);
        sut = new OfferFilterStore();
    });
    describe('get and set filters', () => {

        it('should get filters', () => {
            sut.setSelected(collection, type);
            expect(sut.selectedFilers[type]).toEqual(collection);
        });

        it('should set filters', () => {
            expect(sut.getSelected()).toEqual(sut.selectedFilers);
        });
    });
});

