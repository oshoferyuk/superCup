import { LoggedGuard } from './logged-guard';

describe('LoggedGuard', () => {
    let sut;
    let Router;
    let CookieService;

    beforeEach(() => {
        Router = {
            navigate: jasmine.createSpy('navigate')
        };

        CookieService = {
            checkCookie: jasmine.createSpy('navigate')
        };

        sut = new LoggedGuard(Router, CookieService);
    });

    describe('can activate children', () => {
        describe('when cookie is bad', () => {
            beforeEach(() => {
                CookieService.checkCookie.and.returnValue(false);
            });

            it('should be able to activate', () => {
                expect(sut.canActivate()).toBeTruthy();
            });
        });

        describe('when cookie is ok', () => {
            let result;

            beforeEach(() => {
                CookieService.checkCookie.and.returnValue(true);
                result = sut.canActivate();
            });

            it('should not be able to activate route', () => {
                expect(result).toBeFalsy();
            });

            it('should navigate to login state', () => {
                expect(Router.navigate).toHaveBeenCalledWith(['']);
            });
        });
    });
});
