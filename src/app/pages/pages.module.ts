import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PaymentsComponent } from './payments/payments.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PagesComponent,
    LoginComponent,
    PaymentsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
