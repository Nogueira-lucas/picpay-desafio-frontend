import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ButtonComponent } from './components/ui/button/button.component';
import { HeaderComponent } from './components/ui/header/header.component';
import { LogoComponent } from './components/ui/logo/logo.component';
import { PageTitleComponent } from './components/ui/page-title/page-title.component';
import { CurrencyPipe } from './pipes/currency.pipe';
import { MaterialModule } from '../../material/material.module';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    PageTitleComponent,
    ButtonComponent,
    ErrorDialogComponent,
    CurrencyPipe,
    ProfileComponent,
  ],
  exports: [
    HeaderComponent,
    LogoComponent,
    PageTitleComponent,
    ButtonComponent,
    ErrorDialogComponent,
    CurrencyPipe,
  ],
  imports: [CommonModule, MaterialModule],
})
export class SharedModule {}
