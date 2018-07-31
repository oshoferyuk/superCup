import { Component, Injectable, ViewContainerRef } from '@angular/core';
import { ComponentType, MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { DialogConfirmComponent } from './dialog-confirm.component';
import { DialogOptions } from './dialog-options.model';

@Injectable()
export class DialogService {

    private defaultConfig: Object = {
        disableClose: true
    };

    constructor(private dialog: MdDialog) {
    }

    alert(viewContainerRef: ViewContainerRef,
          dialogOptions?: DialogOptions): Observable<any> {

        Object.assign(dialogOptions.options, {cancel: null});

        return this.open(DialogConfirmComponent, viewContainerRef, dialogOptions);
    }

    confirm(viewContainerRef: ViewContainerRef,
            dialogOptions?: DialogOptions): Observable<any> {

        return this.open(DialogConfirmComponent, viewContainerRef, dialogOptions);
    }

    // Custom
    open(Component: ComponentType<any>,
         viewContainerRef: ViewContainerRef,
         settings: DialogOptions = new DialogOptions()): Observable<any> {

        let dialogRef: MdDialogRef<Component>;

        const {options, config} = settings;

        const defaultConfig = new MdDialogConfig();
        defaultConfig.viewContainerRef = viewContainerRef;
        Object.assign(defaultConfig, config);

        dialogRef = this.dialog.open(Component, defaultConfig);

        Object.assign(dialogRef, this.defaultConfig);
        Object.assign(dialogRef.componentInstance, options);

        return dialogRef.afterClosed();
    }
}
