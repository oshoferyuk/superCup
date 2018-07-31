import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerComponent } from './progress-spinner.component';
import { MdProgressSpinnerModule } from '@angular/material';

@NgModule({
    declarations: [
        ProgressSpinnerComponent
    ],
    imports: [
        CommonModule,
        MdProgressSpinnerModule
    ],
    exports: [
        ProgressSpinnerComponent
    ]
})
export class ProgressSpinnerModule {
}
