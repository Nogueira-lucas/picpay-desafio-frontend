import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentListComponent } from './payments/payment-list/payment-list.component';
import { NavbarComponent } from './navbar/navbar.component';

import { PaymentsService } from './payments/payments.service';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentModalComponent } from './payments/payment-modal/payment-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PaymentsComponent,
    PaymentListComponent,
    NavbarComponent,
    PaymentModalComponent,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],

  entryComponents: [
  ],

  providers: [
    PaymentsService,
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
