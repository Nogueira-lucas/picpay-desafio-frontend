import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { InputConfig } from './inputConfig';

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

    @Input() inputConfig: InputConfig;
    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    placeholder: string;

    constructor() { }

    ngOnInit(): void {
        this.placeholder = this.inputConfig.placeholder ? this.inputConfig.placeholder : "Insira um(a) " + this.inputConfig.label
    }

}