import { ExportDialogService } from './export-dialog.service';
import { Observable } from 'rxjs/Observable';

describe('ExportDialogService', () => {
    let sut;
    let DialogService;
    let ViewContainerRef;

    beforeEach(() => {
        DialogService = {
            alert: jasmine.createSpy('confirm').and.returnValue(Observable.of()),
        };

        ViewContainerRef = {};

        sut = new ExportDialogService(
            DialogService,
            ViewContainerRef,
        );
    });

    describe('show export dialog', () => {
        let result;
        let succesCb;

        beforeEach(() => {
            succesCb = jasmine.createSpy('succesCb');
        });

        it('should show dialog', () => {
            sut.showExportDialog();

            expect(DialogService.alert).toHaveBeenCalledWith(
                ViewContainerRef,
                jasmine.objectContaining({
                    options: {
                        message: 'offer.dialogs.export.message'
                    }
                })
            );
        });

        describe('when dialog resolved', () => {
            beforeEach(() => {
                DialogService.alert.and.returnValue(Observable.of(true));

                result = sut.showExportDialog().subscribe(succesCb);
            });

            it('should return dialog result further', () => {
                expect(succesCb).toHaveBeenCalled();
            });
        });
    });
});
