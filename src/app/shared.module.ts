import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from './componentes/modal/modal.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        //region Material Modules
        MatInputModule,
        MatFormFieldModule
        //endregion Material Modules
    ],
    declarations: [
        ModalComponent
    ],
    exports: [
        ModalComponent
    ]
})
export class SharedModule { }