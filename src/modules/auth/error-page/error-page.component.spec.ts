import { ErrorPageComponent } from './error-page.component';


describe('ErrorPageComponent', () => {
    let sut;
    let translateValue;
    let Router;
    let ActivatedRouter;
    let Translate;

    beforeEach(() => {

        translateValue = Symbol('test');

        Router = {
            navigate: jasmine.createSpy('navigate')
        };

        ActivatedRouter = {
            snapshot: {
                params: {status: 500}
            }
        };

        Translate = {
            instant: jasmine.createSpy('instant').and.returnValue(translateValue)
        }

        sut = new ErrorPageComponent(
            Router,
            ActivatedRouter,
            Translate
        );
    });

    describe('on init', () => {
        it('should define  error message', () => {
            sut.activatedRoute = ActivatedRouter;
            sut.ngOnInit();
            expect(sut.errorCode).toEqual(500);
            expect(sut.errorMessage).toEqual(translateValue);
        });

        it('should go to login page', () => {
            sut.goToLogin();
            expect(sut.router.navigate).toHaveBeenCalledWith(['login']);
        });
    });
});
