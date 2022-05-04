import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CreatePaymentModalComponent } from './components/create-payment-modal/create-payment-modal.component';
import { DeletePaymentModalComponent } from './components/delete-payment-modal/delete-payment-modal.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PaymentsService } from './services/payments.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';


const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [	
    AppComponent, CreatePaymentModalComponent, DeletePaymentModalComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [PaymentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
