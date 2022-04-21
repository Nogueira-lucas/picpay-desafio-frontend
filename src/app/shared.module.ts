import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from './componentes/modal/modal.component';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
    imports: [
        CommonModule,
        MatButtonModule
    ],
    declarations: [
        ModalComponent,
    ],
    exports: [
        ModalComponent
    ]
})
export class SharedModule { }