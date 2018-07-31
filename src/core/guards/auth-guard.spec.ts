import { AuthGuard } from './auth-guard';

describe('AuthGuard', () => {
    let sut;
    let Router;
    let CookieService;
    let StorageService;

    beforeEach(() => {
        Router = {
            navigate: jasmine.createSpy('navigate')
        };

        CookieService = {
            checkCookie: jasmine.createSpy('navigate')
        };

        StorageService = {
            clearData: jasmine.createSpy('clearData')
        };

        sut = new AuthGuard(Router, CookieService, StorageService);
    });

    describe('can activate children', () => {
        describe('when cookie is ok', () => {
            beforeEach(() => {
                CookieService.checkCookie.and.returnValue(true);
            });

            it('should be able to activate', () => {
                expect(sut.canActivateChild()).toBeTruthy();
            });
        });

        describe('when cookie is bad', () => {
            let result;

            beforeEach(() => {
                CookieService.checkCookie.and.returnValue(false);
                result = sut.canActivateChild();
            });

            it('should not be able to activate route', () => {
                expect(result).toBeFalsy();
            });

            it('should navigate to login state', () => {
                expect(Router.navigate).toHaveBeenCalledWith(['login'])
            });
        });
    });
});
