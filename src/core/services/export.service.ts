import { Injectable, Inject } from '@angular/core';
import { FpWindow } from './wrappers';
import { appName } from '../../setup.service';

@Injectable()
export class ExportService {
    constructor(@Inject(FpWindow) private window: FpWindow) {
    }

    openFile(url: string): void {
        this.window.open(url, appName);
    }
}
