import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ButtonComponent } from './components/atoms/button/button.component';
import { TitleComponent } from './components/atoms/title/title.component';
import { InputComponent } from './components/atoms/input/input.component';
import { LogoComponent } from './components/atoms/logo/logo.component';
import { ImageComponent } from './components/atoms/image/image.component';
import { FormLoginComponent } from './components/molecules/form-login/form-login.component';
@NgModule({
  declarations: [	
    AppComponent, ButtonComponent, TitleComponent, InputComponent, LogoComponent, ImageComponent, FormLoginComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
