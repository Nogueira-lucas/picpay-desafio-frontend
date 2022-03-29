import { Component, HostBinding } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Alert } from '../../models/alert';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
})
export class AlertComponent {
    @HostBinding('class') className = 'toast-container position-fixed p-3';
    @HostBinding('style') style = 'z-index: 1200; right: 0;';

    get alerts(): Alert[] {
        return this.alertService.getAlerts();
    }

    constructor(public alertService: AlertService) {}
}
