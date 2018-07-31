import { appName, SetupService } from './setup.service';

describe('SetupService', () => {
    let sut;
    let I18n;
    let window;

    beforeEach(() => {
        I18n = {
            setup: jasmine.createSpy('setup')
        };

        window = {};

        sut = new SetupService(
            I18n,
            window
        );
    });

    describe('setup', () => {
        beforeEach(() => {
            sut.setup();
        });

        it('should setup language service', () => {
            expect(I18n.setup).toHaveBeenCalled();
        });

        it('should give name for application', () => {
            expect(window.name).toEqual(appName);
        });
    });
});
