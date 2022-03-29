import { Injectable } from '@angular/core';
import { Alert } from 'src/app/shared/models/alert';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    private alerts: Alert[];

    constructor() {
        this.alerts = [];
    }

    private show(alert: Alert) {
        this.alerts.push(alert);
    }

    remove(alert: Alert) {
        this.alerts = this.alerts.filter((al) => al.message !== alert.message);
    }

    clear() {
        this.alerts.splice(0, this.alerts.length);
    }

    getAlerts() {
        return this.alerts;
    }

    showSuccess(message: string, delay?: number) {
        this.show({ message, className: 'bg-success text-light', delay });
    }

    showDanger(message: string, delay?: number) {
        this.show({ message, className: 'bg-danger text-light', delay });
    }

    showWarning(message: string, delay?: number) {
        this.show({ message, className: 'bg-warning text-light', delay });
    }
}
