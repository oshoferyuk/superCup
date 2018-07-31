import { Injectable, Inject } from '@angular/core';
import { FpWindow } from './core/services/wrappers/FpWindow';
import { I18n } from './core/services/localization/i18n';

export const appName = 'Flipp';

@Injectable()
export class SetupService {
    constructor(private i18n: I18n,
                @Inject(FpWindow) private window: FpWindow) {
    }

    setup(): void {
        this.i18n.setup();
        this.window.name = appName;
    }
}
