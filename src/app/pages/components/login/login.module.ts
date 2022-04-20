import { LoginRouteModule } from './login.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    LoginRouteModule,
    FormsModule,
    ReactiveFormsModule,
    //#region Material Modules
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    //#endregion
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
