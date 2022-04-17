import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "./modules/material.module";

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
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
