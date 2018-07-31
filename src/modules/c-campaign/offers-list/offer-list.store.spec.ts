import { OfferListStore } from './offer-list.store';
import { EventEmitter } from '@angular/core';

describe('OfferListStore', () => {
    let sut;

    let callbackOnUpdate;

    beforeEach(() => {
        callbackOnUpdate = jasmine.createSpy('callbackOnUpdate');

        sut = new OfferListStore();
    });

    describe('update', () => {
        let newData;
        let result;

        beforeEach(() => {
            newData = 'mockedNewData';
            sut.onUpdate().subscribe(callbackOnUpdate);
            result = sut.update(newData);
        });

        it('should store data', () => {
            expect(sut.store).toEqual(newData);
        });

        it('should return stored data', () => {
            expect(result).toEqual(newData);
        });

        describe('get', () => {
            it('should return stored data', () => {
                expect(sut.get()).toEqual(newData);
            });
        });

        describe('on update', () => {
            it('should call callback on store update', () => {
                expect(callbackOnUpdate).toHaveBeenCalledWith(newData);
            });
        });
    });
});
