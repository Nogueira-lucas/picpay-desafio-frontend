import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from './componentes/modal/modal.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ModalComponent,
    ],
    exports: [
        ModalComponent
    ]
})
export class SharedModule { }