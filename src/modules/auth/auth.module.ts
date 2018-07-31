import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { LoginPageComponent } from './login-page/login-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CoreModule } from '../../core/core.module';

@NgModule({
    imports: [
        AuthRoutingModule,
        CommonModule,
        FormsModule,
        TranslateModule,
        CoreModule,
    ],
    declarations: [
        LoginPageComponent,
        ErrorPageComponent
    ]
})
export class AuthModule {
}
