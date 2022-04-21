import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayModalComponent } from './pay-modal.component';

@NgModule({
    declarations: [
        PayModalComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        PayModalComponent
    ]
})
export class PayModalModule { }