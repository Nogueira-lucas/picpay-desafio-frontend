import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import {MatListModule} from '@angular/material/list';

import { ErrorDialogComponent } from "./components/error-dialog/error-dialog.component";
import { ButtonComponent } from "./components/ui/button/button.component";
import { HeaderComponent } from "./components/ui/header/header.component";
import { LogoComponent } from "./components/ui/logo/logo.component";
import { PageTitleComponent } from "./components/ui/page-title/page-title.component";
import { CurrencyPipe } from './pipes/currency.pipe';

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
    MatListModule
  ],
  imports: [CommonModule, MatDialogModule],
})
export class SharedModule {}