import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginComponent } from '../pages/login/login.component';
import { MyPaymentsComponent } from 'src/pages/my-payments/my-payments.component';
import { ManagePaymentModalComponent } from 'src/components/manage-payment-modal/manage-payment-modal.component';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [	
    AppComponent,
    LoginComponent,
    MyPaymentsComponent,
    ManagePaymentModalComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
