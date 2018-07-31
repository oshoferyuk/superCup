import { Injectable } from '@angular/core';
import { SelectedFilters } from './models/filters.model';

@Injectable()
export class OfferFilterStore {
    private selectedFilers: SelectedFilters = new SelectedFilters();
    constructor() {
    }

    setSelected(collection: Set<any>, type: string): void {
        this.selectedFilers[type] = collection;
    }

    getSelected(): SelectedFilters {
        return this.selectedFilers;
    }
}
