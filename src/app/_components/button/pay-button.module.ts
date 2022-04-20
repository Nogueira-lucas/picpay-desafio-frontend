import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PayButtonComponent } from './pay-button.component';

@NgModule({
    declarations: [
        PayButtonComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    exports: [
        PayButtonComponent
    ]
})
export class PayButtonModule { }