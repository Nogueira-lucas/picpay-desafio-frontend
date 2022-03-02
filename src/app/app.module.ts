import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { PaymentListComponent } from './pages/payments/payment-list/payment-list.component';

import { PaymentsService } from './services/payments.service';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentModalComponent } from './pages/payments/payment-modal/payment-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/shared/home/home.component';
import { PaymentDeleteModalComponent } from './pages/payments/payment-delete-modal/payment-delete-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentsComponent,
    PaymentListComponent,
    PaymentModalComponent,
    LoginComponent,
    HomeComponent,
    PaymentDeleteModalComponent,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
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
