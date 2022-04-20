import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { InputConfig } from './InputConfig';

@Component({
    selector: 'pay-input',
    templateUrl: './pay-input.component.html',
    styleUrls: ['./pay-input.component.scss'],
    viewProviders: [
        {
            provide: ControlContainer,
            useExisting: FormGroupDirective
        }
    ]
})
export class PayInputComponent implements OnInit {

    @Input() config: InputConfig;
    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    placeholder: string;

    constructor() { }

    ngOnInit(): void {
        this.placeholder = this.config.placeholder ? this.config.placeholder : "Insira um(a) " + this.config.label
    }

}