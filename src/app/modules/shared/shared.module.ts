import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ButtonComponent } from './components/ui/button/button.component';
import { HeaderComponent } from './components/ui/header/header.component';
import { LogoComponent } from './components/ui/logo/logo.component';
import { PageTitleComponent } from './components/ui/page-title/page-title.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    PageTitleComponent,
    ButtonComponent,
    ErrorDialogComponent,
  ],
  exports: [
    HeaderComponent,
    LogoComponent,
    PageTitleComponent,
    ButtonComponent,
    ErrorDialogComponent,
    MatIconModule
  ],
  imports: [CommonModule, MatDialogModule],
})
export class SharedModule {}
