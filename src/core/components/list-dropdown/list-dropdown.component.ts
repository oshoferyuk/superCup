import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'fp-list-dropdown',
    templateUrl: './list-dropdown.component.html',
    styleUrls: ['./list-dropdown.component.scss']
})
export class ListDropdownComponent implements OnInit {

    @Output() editOffer: EventEmitter<void> = new EventEmitter<void>();
    @Output() copyOffer: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    ngOnInit(): void {
    }

    edit(): void {
        this.editOffer.emit();
    }

    copy(): void {
        this.copyOffer.emit();
    }
}
