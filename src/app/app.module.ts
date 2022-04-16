import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login-form/login-form.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { TableComponent } from "./components/table/table.component";
import { MyPaymentsComponent } from "./pages/my-payments/my-payments.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { PaymentModalComponent } from "./components/payment-modal/payment-modal.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginPageComponent,
    TableComponent,
    MyPaymentsComponent,
    NavbarComponent,
    PaymentModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSortModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
