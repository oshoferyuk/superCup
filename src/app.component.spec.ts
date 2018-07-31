import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let sut;
    let SetupService;

    beforeEach(() => {
        SetupService = {
            setup: jasmine.createSpy('setup')
        };

        sut = new AppComponent(SetupService);
    });

    it('should setup application', () => {
        expect(SetupService.setup).toHaveBeenCalled();
    });
});
