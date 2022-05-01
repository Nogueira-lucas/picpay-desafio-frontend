import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CreatePaymentModalComponent } from './components/create-payment-modal/create-payment-modal.component';
import { DeletePaymentModalComponent } from './components/delete-payment-modal/delete-payment-modal.component';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  declarations: [	
    AppComponent, CreatePaymentModalComponent, DeletePaymentModalComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
