import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { PageLayoutComponent } from './layouts/page-layout/page-layout.component';
import { SharedModule } from './shared/shared.module';
import { PaymentFacade } from './facade/payment.facade';
import { PaymentState } from './state/payment.state';
import { UserFacade } from './facade/user.facade';
import { UserState } from './state/user.state';
import { ToastrModule } from 'ngx-toastr';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: "."
};

@NgModule({
  declarations: [
    AppComponent, AuthLayoutComponent, PageLayoutComponent,
   ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot(),
    CurrencyMaskModule
  ],
  providers: [
    PaymentFacade, 
    PaymentState, 
    UserFacade, 
    UserState,
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
