import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ButtonComponent } from './components/ui/button/button.component';
import { HeaderComponent } from './components/ui/header/header.component';
import { LogoComponent } from './components/ui/logo/logo.component';
import { PageTitleComponent } from './components/ui/page-title/page-title.component';
import { CurrencyPipe } from './pipes/currency.pipe';
import { MatPaginatorIntlPtbr } from '../payments/components/task-list/Intl/mat-paginator.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    PageTitleComponent,
    ButtonComponent,
    ErrorDialogComponent,
    CurrencyPipe,
  ],
  exports: [
    HeaderComponent,
    LogoComponent,
    PageTitleComponent,
    ButtonComponent,
    ErrorDialogComponent,
    MatIconModule,
    MatCheckboxModule,
    CurrencyPipe,
    MatListModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlPtbr}],
  imports: [CommonModule, MatDialogModule],
})
export class SharedModule {}
