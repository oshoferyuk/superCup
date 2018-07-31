import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SetupService } from './setup.service';
import { ProgressSpinnerService } from './core/progress-spinner/progress-spinner.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CoreModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        NgbModule.forRoot()
    ],
    providers: [
        SetupService,
        ProgressSpinnerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
