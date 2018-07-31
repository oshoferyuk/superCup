import { ProgressSpinnerService } from './progress-spinner.service';

describe('ProgressSpinnerService', () => {
    let sut;
    let loaderIsShownMock;

    beforeEach(() => {
        sut = new ProgressSpinnerService();

        loaderIsShownMock = {
            next: jasmine.createSpy('next')
        };
        sut.loaderIsShown = loaderIsShownMock;
    });

    it('show invoke subject loader', () => {
        sut.show();
        expect(sut.loaderIsShown.next).toHaveBeenCalledWith(true);
    });

    it('hide invoke subject loader', () => {
        sut.hide();
        expect(sut.loaderIsShown.next).toHaveBeenCalledWith(false);
    });

});
