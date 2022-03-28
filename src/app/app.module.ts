import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BootstrapModule } from './modules/bootstrap/bootstrap.module'; 


import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { DeletePaymentComponent } from './components/delete-payment/delete-payment.component';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AlertComponent } from './components/alert/alert.component'


@NgModule({
  declarations: [	
    AppComponent, LoginComponent, NotfoundComponent, PaymentsComponent, DeletePaymentComponent, AddPaymentComponent, ToolbarComponent, AlertComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BootstrapModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
