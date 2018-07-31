import { CookieService } from './cookie.service';

describe('CookieService', () => {
    let sut;
    let Window;
    let Document;

    beforeEach(() => {
        Window = {
            decodeURIComponent: jasmine.createSpy('decodeURIComponent')
                .and.callFake(value => value),
        };

        Document = {
            cookie: ''
        };

        sut = new CookieService(Window, Document);
    });

    describe('check cookie', () => {
        describe('should be false', () => {
            it('if flip jwt token is not in cookie', () => {
                Document.cookie = '';
                expect(sut.checkCookie()).toBeFalsy();
            });

            it('if flip jwt token is empty', () => {
                Document.cookie = 'flip.jwt=';
                expect(sut.checkCookie()).toBeFalsy();
            });
        });

        it('should be true if flip jwt token is present and not empty in cookie', () => {
            Document.cookie = 'flip.jwt=123';
            expect(sut.checkCookie()).toBeTruthy();
        });
    });
});
