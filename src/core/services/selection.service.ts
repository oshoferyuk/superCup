import { Injectable } from '@angular/core';

@Injectable()
export class SelectionService {
    collection: string;

    constructor(collection: string) {
        this.collection = collection;
        this[this.collection] =  new Set<any>();
    }

    select<T>(item: T): void {
        this[this.collection].add(item);
    }

    deselect<T>(item: T): void {
        this[this.collection].delete(item);
    }

    clearAll(): void {
        this[this.collection].clear();
    }

    isSelected<T>(item: T): boolean {
        return this[this.collection].has(item);
    }

    getSelected<T>(): Set<T> {
        return this[this.collection];
    }

    selectAll<T>(items: T[]): void {
        items.forEach(item => this.select(item));
    }

    deselectAll<T>(items: T[]): void {
        items.forEach(item => this.deselect(item));
    }

    isAllSelected<T>(items: T[]): boolean {
        return items.every(item => this.isSelected(item));
    }

    isAllDeselected<T>(items: T[]): boolean {
        return !items.some(item => this.isSelected(item));
    }

}
