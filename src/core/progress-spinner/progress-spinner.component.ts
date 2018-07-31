import { Component, Input } from '@angular/core';

@Component({
    selector: 'fp-progress-spinner',
    templateUrl: './progress-spinner.component.html',
    styleUrls: ['./progress-spinner.component.scss'],
})
export class ProgressSpinnerComponent {
    @Input() stateSpinner: boolean;

    constructor() {}
}
