import { Injectable, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DialogService } from '../../../../core/dialog/dialog.service';
import { DialogOptions } from '../../../../core/dialog/dialog-options.model';

@Injectable()
export class ExportDialogService {
    constructor(private dialogService: DialogService,
                private viewContainerRef: ViewContainerRef) {
    }

    showExportDialog(): Observable<any> {
        const dialogOptions = new DialogOptions();
        dialogOptions.options = {
            message: 'offer.dialogs.export.message'
        };

        return this.dialogService.alert(this.viewContainerRef, dialogOptions)
            .filter(result => result);
    }
}
