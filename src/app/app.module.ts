import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginModule } from './pages/login/login.module';
import { PaymentModule } from './pages/payment/payment.module';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LoginModule, HttpClientModule, PaymentModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
