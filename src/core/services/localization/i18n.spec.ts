import { I18n } from './i18n';

describe('i18n', () => {
    let sut;
    let TranslateService;

    beforeEach(() => {
        TranslateService = {
            setTranslation: jasmine.createSpy('setTranslation'),
            setDefaultLang: jasmine.createSpy('setDefaultLang')
        };

        sut = new I18n(TranslateService);
    });

    describe('setup', () => {
        beforeEach(() => {
            sut.setup();
        });

        it('should set translation config', () => {
            expect(TranslateService.setTranslation).toHaveBeenCalledWith('en', jasmine.any(Object));
        });

        it('should set default language to en', () => {
            expect(TranslateService.setDefaultLang).toHaveBeenCalledWith('en');
        });
    });
});
