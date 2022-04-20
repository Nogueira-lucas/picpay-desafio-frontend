import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PayInputComponent } from './pay-input.component';

@NgModule({
    declarations: [
        PayInputComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    exports: [
        PayInputComponent
    ]
})
export class PayInputModule { }