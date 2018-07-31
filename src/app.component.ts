import { Component } from '@angular/core';
import { SetupService } from './setup.service';

@Component({
    selector: 'fp-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private setupService: SetupService) {
        this.setupService.setup();
    }
}
