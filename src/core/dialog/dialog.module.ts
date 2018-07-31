import { NgModule } from '@angular/core';
import { MdDialogModule } from '@angular/material';
import { DialogService } from './dialog.service';
import { DialogConfirmComponent } from './dialog-confirm.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        DialogConfirmComponent
    ],
    imports: [
        CommonModule,
        MdDialogModule,
        TranslateModule
    ],
    providers: [
        DialogService
    ],
    exports: [],
    entryComponents: [
        DialogConfirmComponent
    ]
})
export class DialogModule {
}
