import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { AuthGuardService } from "./services/authGuard/auth-guard.service";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login-form/login-form.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { TableComponent } from "./components/table/table.component";
import { MyPaymentsComponent } from "./pages/my-payments/my-payments.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { PaymentModalComponent } from "./components/payment-modal/payment-modal.component";
import { AppRoutingModule } from "./app-routing.module";

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
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSortModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    AppRoutingModule,
  ],
  providers: [MatDatepickerModule, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
