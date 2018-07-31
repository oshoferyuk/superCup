import { Injectable, Inject } from '@angular/core';
import { FpWindow } from './wrappers';
export const storageParams = {
    searchParams: 'searchParams',
    selectedFilters: 'selectedFilters'
};

@Injectable()
export class StorageService {

    constructor(@Inject(FpWindow) private window: FpWindow) {
    }

    setData(key: string, value: any): void {
        if (this.window.localStorage) {
            this.window.localStorage.setItem(key, value);
        }
    }

    getData(key: string): string | undefined {
        if (this.window.localStorage) {
            return this.window.localStorage.getItem(key);
        }
    }

    clearData(key: string): void {
        if (this.window.localStorage) {
            this.window.localStorage.removeItem(key);
        }
    }
}
