import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutComponent } from 'src/layout/layout.component';
import { HeaderComponent } from 'src/layout/header/header.component';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from 'src/pages/login/login.component';
import { MyPaymentsComponent } from 'src/pages/my-payments/my-payments.component';
import { ManagePaymentModalComponent } from 'src/components/manage-payment-modal/manage-payment-modal.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [	
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    LoginComponent,
    MyPaymentsComponent,
    ManagePaymentModalComponent

   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
