import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { TextMaskModule } from 'angular2-text-mask';
import { SelectModule } from 'ng2-select';
import { TooltipModule } from 'ngx-bootstrap';
import { NgUploaderModule } from 'ngx-uploader';

import { ListDropdownComponent } from './components/list-dropdown/list-dropdown.component';

import { AuthGuard } from './guards/auth-guard';
import { LoggedGuard } from './guards/logged-guard';
import { Helpers, FormHelpers } from './helpers';
import { CookieService } from './services/cookie.service';
import { I18n } from './services/localization/i18n';
import { OfferService } from './services/offer/offer.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MaskService } from './services/validators/mask.service';
import { FpDocument, getDocument } from './services/wrappers/FpDocument';
import { FpWindow, getWindow } from './services/wrappers/FpWindow';
import { DialogModule } from './dialog/dialog.module';
import { TransferModule } from './transfer-module/transfer.module';

import {
    TooltipComponent,
    PageNotFoundComponent,
    InputSwitcherComponent,
    ImageUploaderComponent,
    MultipleSelectComponent,
    ControlMessageComponent,
    FormControlComponent,
} from './components';
import { ExportService } from './services/export.service';
import { StorageService } from './services/storage.service';
import { ProgressSpinnerModule } from './progress-spinner/progress-spinner.module';

@NgModule({
    declarations: [
        TooltipComponent,
        PageNotFoundComponent,
        InputSwitcherComponent,
        ImageUploaderComponent,
        MultipleSelectComponent,
        ControlMessageComponent,
        FormControlComponent,
        ListDropdownComponent,
    ],
    imports: [
        SelectModule,
        CommonModule,
        HttpModule,
        FormsModule,
        NgUploaderModule,
        TextMaskModule,
        TranslateModule,
        DialogModule,
        BsDropdownModule.forRoot(),
        TooltipModule.forRoot(),
        ProgressSpinnerModule
    ],
    providers: [
        { provide: FpWindow, useFactory: getWindow },
        { provide: FpDocument, useFactory: getDocument },
        Helpers,
        FormHelpers,
        I18n,
        AuthGuard,
        LoggedGuard,
        CookieService,
        OfferService,
        MaskService,
        ExportService,
        StorageService
    ],
    exports: [
        TextMaskModule,
        TooltipComponent,
        InputSwitcherComponent,
        ImageUploaderComponent,
        MultipleSelectComponent,
        ListDropdownComponent,
        TranslateModule,
        TransferModule,
        DialogModule,
        ControlMessageComponent,
        FormControlComponent,
        ProgressSpinnerModule
    ]
})
export class CoreModule {
}
