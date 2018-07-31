import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { transferServices } from './';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [
        ...transferServices
    ]
})
export class TransferModule { }
