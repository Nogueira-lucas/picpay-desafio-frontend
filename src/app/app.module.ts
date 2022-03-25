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
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ListPaymentsComponent } from './components/payments/list-payments/list-payments.component';
import { TablePaymentsComponent } from './components/payments/table-payments/table-payments.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UpdatePaymentComponent } from './components/payments/dialog/update-payment/update-payment.component';
import { DeletePaymentComponent } from './components/payments/dialog/delete-payment/delete-payment.component';


@NgModule({
  declarations: [	
    AppComponent, HeaderComponent, HomeComponent, PaymentsComponent, AddPaymentComponent, ListPaymentsComponent, TablePaymentsComponent, UpdatePaymentComponent, DeletePaymentComponent
   ],
  imports: [
    BrowserModule,
    MatToolbarModule, 
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
