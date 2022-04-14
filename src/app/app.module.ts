import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ButtonComponent } from './components/atoms/button/button.component';
import { TitleComponent } from './components/atoms/title/title.component';
import { InputComponent } from './components/atoms/input/input.component';
import { FormLoginComponent } from './components/molecules/form-login/form-login.component';

import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './components/pages/login/login.module';
import { HomeModule } from './components/pages/home/home.module';
import { AtomsModule } from './components/atoms/atoms.module';
@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    TitleComponent,
    InputComponent,
    FormLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HomeModule,
    AtomsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
