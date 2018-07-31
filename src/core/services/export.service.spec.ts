import { ExportService } from './export.service';
import { appName } from '../../setup.service';

describe('CookieService', () => {
    let sut;
    let window;

    beforeEach(() => {
        window = {
            open: jasmine.createSpy('open')
        };

        sut = new ExportService(window);
    });

    describe('open file', () => {
        it('should open new tab with file', () => {
            sut.openFile('url');

            expect(window.open).toHaveBeenCalledWith('url', appName);
        });
    });
});
