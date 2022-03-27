import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LogoComponent,
        HeaderComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        LogoComponent]
})
export class SharedModule { }