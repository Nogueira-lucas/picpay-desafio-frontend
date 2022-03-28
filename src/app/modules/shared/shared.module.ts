import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/ui/header/header.component';
import { LogoComponent } from './components/ui/logo/logo.component';
import { PageTitleComponent } from './components/ui/page-title/page-title.component';
import { ButtonComponent } from './components/ui/button/button.component';



@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    PageTitleComponent,
    ButtonComponent
  ],
  exports: [
    HeaderComponent,
    LogoComponent,
    PageTitleComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
