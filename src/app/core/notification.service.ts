import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(private _snackBar: MatSnackBar) { }

    open = (message: string, action: string = null, duration: number = 3000) =>
        this._snackBar.open(message, action, {
            duration: duration
        });
}
