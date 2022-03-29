import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-error-message',
    templateUrl: './error-message.component.html',
    styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {
    constructor() {}

    @Input() field: FormControl;
    @Input() name: string;
    @Input() prop: string | number;
}
