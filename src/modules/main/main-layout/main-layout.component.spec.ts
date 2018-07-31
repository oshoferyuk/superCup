import { MainLayoutComponent } from './main-layout.component';
import { Observable } from 'rxjs/Observable';

describe('MainLayoutComponent', () => {
    let sut;
    let ProgressSpinnerService;
    let ChangeDetectorRef;

    beforeEach(() => {
        ProgressSpinnerService = {};

        ChangeDetectorRef = {
            markForCheck: jasmine.createSpy('markForCheck')
        };

        sut = new MainLayoutComponent(
            ProgressSpinnerService,
            ChangeDetectorRef,
        );
    });

    describe('on init', () => {
        describe('when spinner should not be shown', () => {
            beforeEach(() => {
                ProgressSpinnerService.loaderIsShown = Observable.of(false);
                sut.ngOnInit();
            });

            it('should set spinner flag on scope as false', () => {
                expect(sut.triggerSpinner).toBeFalsy();
            });

            it('should call for change detection', () => {
                expect(ChangeDetectorRef.markForCheck).toHaveBeenCalled();
            });
        });

        describe('when spinner should be shown', () => {
            beforeEach(() => {
                ProgressSpinnerService.loaderIsShown = Observable.of(true);
                sut.ngOnInit();
            });

            it('should set spinner flag on scope as true', () => {
                expect(sut.triggerSpinner).toBeTruthy();
            });

            it('should call for change detection', () => {
                expect(ChangeDetectorRef.markForCheck).toHaveBeenCalled();
            });
        });
    });
});
