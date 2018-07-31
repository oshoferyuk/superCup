import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProgressSpinnerService {

    public loaderIsShown: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {}

    show(): void {
        this.loaderIsShown.next(true);
    }

    hide(): void {
        this.loaderIsShown.next(false);
    }

}
