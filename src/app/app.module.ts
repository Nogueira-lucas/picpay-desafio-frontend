import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from 'src/pages/login/login.component';
import { MyPaymentsComponent } from 'src/pages/my-payments/my-payments.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button'; 
import { MatTableModule } from '@angular/material/table'  
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { MatSortModule } from '@angular/material/sort';
import { LayoutComponent } from 'src/layout/layout.component';
import { HeaderComponent } from 'src/layout/header/header.component';
import { AppComponent } from './app.component';
import { ManagePaymentModalComponent } from 'src/components/manage-payment-modal/manage-payment-modal.component';

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
    MatSnackBarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatDialogModule,
    MatCardModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    CurrencyMaskModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
