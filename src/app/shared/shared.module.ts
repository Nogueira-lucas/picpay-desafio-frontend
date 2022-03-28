import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { PageTitleComponent } from './page-title/page-title.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatMenuModule
    ],
    declarations: [
        LogoComponent,
        HeaderComponent,
        PageTitleComponent,
    ],
    exports: [
        CommonModule,
        FormsModule,
        LogoComponent,
        HeaderComponent,
        PageTitleComponent,
    ]
})
export class SharedModule { }