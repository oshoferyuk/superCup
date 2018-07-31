import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'fp-dialog-confirm',
    templateUrl: './dialog-confirm.html',
    styleUrls: ['./dialog-confirm.scss'],
})
export class DialogConfirmComponent {
    public title: string;
    public message: string;
    public ok: string = 'Confirm';
    public cancel: string = 'Cancel';

    constructor(private dialogRef: MdDialogRef<any>) {
    }

    confirm(): void {
        this.dialogRef.close(true);
    }

    close(): void {
        this.dialogRef.close();
    }
}
