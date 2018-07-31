import { Component, Input, OnInit } from '@angular/core';

@Component({
    /* tslint:disable-next-line:component-selector*/
    selector: '[fpTooltip]',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit {
    @Input() fpTooltip: string;

    constructor() { }

    ngOnInit(): void {
    }

}
