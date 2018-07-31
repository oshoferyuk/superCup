import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ProgressSpinnerService } from '../../../core/progress-spinner/progress-spinner.service';


@Component({
    selector: 'fp-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit {

    triggerSpinner: boolean;

    constructor(
        private progressSpinnerService: ProgressSpinnerService,
        private cd: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.progressSpinnerService.loaderIsShown.subscribe((isSpinnerShown: boolean) => {
            this.triggerSpinner = isSpinnerShown;
            this.cd.markForCheck();
        });
    }

}
