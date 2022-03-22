import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import { HomeComponent } from './views/home/home.component';
import { AppRoutingModule } from './app-routing.modules';
import { PaymentsComponent } from './components/payments/payments.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { AddPaymentComponent } from './components/payments/dialog/add-payment/add-payment.component';
@NgModule({
  declarations: [	
    AppComponent, HeaderComponent, HomeComponent, PaymentsComponent, AddPaymentComponent
   ],
  imports: [
    BrowserModule,
    MatToolbarModule, 
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
