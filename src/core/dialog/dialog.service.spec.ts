import { MdDialogConfig } from '@angular/material';
import { DialogConfirmComponent } from './dialog-confirm.component';
import { DialogService } from './dialog.service';
import { DialogOptions } from './dialog-options.model';

describe('DialogService', () => {
    let sut;
    let ViewContainerRef;
    let MdDialog;
    let dialogRef;

    const observable = Symbol('observable');

    beforeEach(() => {
        ViewContainerRef = {};

        dialogRef = {
            componentInstance: {},
            afterClosed() {
                return observable;
            }
        };

        MdDialog = {
            open: jasmine.createSpy('open').and.returnValue(dialogRef)
        };


        sut = new DialogService(MdDialog);
    });

    describe('open', () => {
        let result;

        it('should open dialog with any component and config', () => {
            result = sut.open(DialogConfirmComponent, ViewContainerRef);

            const config = new MdDialogConfig();
            config.viewContainerRef = ViewContainerRef;

            expect(MdDialog.open).toHaveBeenCalledWith(DialogConfirmComponent, config);
        });

        it('should return observable after close', () => {
            expect(result).toEqual(observable);
        });

        describe('when no additional dialog options', () => {
            it('should not override component properties', () => {
                sut.open(DialogConfirmComponent, ViewContainerRef);
                expect(dialogRef.componentInstance).toEqual({});
            });
        });

        describe('when additional dialog options', () => {
            const dialogOptions = new DialogOptions();
            dialogOptions.options = {title: Math.random()};

            it('should override component properties with proper options', () => {
                sut.open(DialogConfirmComponent, ViewContainerRef, dialogOptions);
                expect(dialogRef.componentInstance).toEqual(dialogOptions.options);
            });
        });

        describe('when additional dialog config', () => {
            const dialogOptions = new DialogOptions();
            dialogOptions.config = {width: Math.random()};

            it('should extend and override component config properties with proper options', () => {
                sut.open(DialogConfirmComponent, ViewContainerRef, dialogOptions);

                const config = new MdDialogConfig();
                config.viewContainerRef = ViewContainerRef;
                config.width = dialogOptions.config['width'];

                expect(MdDialog.open).toHaveBeenCalledWith(DialogConfirmComponent, config);
            });
        });
    });

    describe('confirm', () => {
        let result;

        const dialogOptions = new DialogOptions();

        beforeEach(() => {
            sut.open = jasmine.createSpy('open').and.returnValue(observable);
            result = sut.confirm(ViewContainerRef, dialogOptions);
        });

        it('should open confirm dialog', () => {
            expect(sut.open).toHaveBeenCalledWith(
                DialogConfirmComponent,
                ViewContainerRef,
                dialogOptions
            );
        });

        it('should return observable after close', () => {
            expect(result).toEqual(observable);
        });
    });

    describe('alert', () => {
        let result;

        const dialogOptions = new DialogOptions();
        dialogOptions.options = {cancel: 'cancel'};
        beforeEach(() => {
            sut.open = jasmine.createSpy('open').and.returnValue(observable);
            result = sut.alert(ViewContainerRef, dialogOptions);
        });

        it('should open alert dialog without cancel button', () => {
            const dialogOptionsWithoutCancel = new DialogOptions();
            dialogOptionsWithoutCancel.options = {cancel: null};
            expect(sut.open).toHaveBeenCalledWith(
                DialogConfirmComponent,
                ViewContainerRef,
                dialogOptionsWithoutCancel
            );
        });

        it('should return observable after close', () => {
            expect(result).toEqual(observable);
        });
    });
});
