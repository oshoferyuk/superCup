import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { MainRoutingModule, mainRouterComponents } from './main-routing.module';
import { CoreModule } from '../../core/core.module';

@NgModule({
    imports: [
        CommonModule,
        MainRoutingModule,
        CoreModule,
    ],
    declarations: [
        HeaderComponent,
        mainRouterComponents
    ]
})
export class MainModule {}
