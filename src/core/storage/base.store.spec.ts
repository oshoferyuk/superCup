import { BaseStore } from './base.store';

describe('BaseStoreService', () => {
    let sut;
    let newStore;
    let callbackOnUpdate;

    beforeEach(() => {
        newStore = Symbol('newStore');

        callbackOnUpdate = jasmine.createSpy('callbackOnUpdate');

        sut = new BaseStore(newStore);
    });

    describe('update', () => {
        let result;

        beforeEach(() => {
            sut.onUpdate().subscribe(callbackOnUpdate);
            result = sut.update(newStore);
        });

        it('should save data in store', () => {
            expect(sut.store).toEqual(newStore);
        });

        it('should return new stored value', () => {
            expect(result).toEqual(newStore);
        });

        it('should call callback on store update', () => {
            expect(callbackOnUpdate).toHaveBeenCalledWith(newStore);
        });

        describe('get stored value', () => {
            it('should return stored value', () => {
                expect(sut.get()).toEqual(newStore);
            });
        });
    });
});
