import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from './logo/logo.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LogoComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        LogoComponent]
})
export class SharedModule { }