import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentListComponent } from './payments/payment-list/payment-list.component';
import { NavbarComponent } from './navbar/navbar.component';

import { PaymentsService } from './payments/payments.service';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [	
    AppComponent, 
    PaymentsComponent, 
    PaymentListComponent, 
    NavbarComponent,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  
  providers: [PaymentsService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
