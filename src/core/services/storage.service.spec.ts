import { StorageService } from './storage.service';

describe('StorageService', () => {
    let sut;
    let key;
    let value;
    let Window;

    beforeEach(() => {
        key = 'key';
        value = 'value';
        Window = {
            localStorage: {
                getItem: jasmine.createSpy('getItem'),
                setItem: jasmine.createSpy('setItem'),
                removeItem: jasmine.createSpy('removeItem')
            }
        };

        sut = new StorageService(Window);
    });
    describe('check localStorage', () => {
        it('should get data from localStorage', () => {
            sut.getData(key);
            expect(sut.window.localStorage.getItem).toHaveBeenCalledWith(key);
        });

        it('should set data to localStorage', () => {
            sut.setData(key, value);
            expect(sut.window.localStorage.setItem).toHaveBeenCalledWith(key, value);
        });

        it('should delete data from localStorage', () => {
            sut.clearData(key);
            expect(sut.window.localStorage.removeItem).toHaveBeenCalledWith(key);
        });
    });
});
