import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from 'src/core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../core/routings/app-routing.module';
import { LoginModule } from '../pages/login/login.module';
import { TaskModule } from 'src/pages/task/task.module';
import { ToolbarModule } from 'src/components/toolbar/toolbar.module';
import { LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { DialogsModule } from '../components/dialogs/dialogs.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { Error404Component } from '../pages/error404/error404.component';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    }
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CurrencyMaskModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    LoginModule,
    TaskModule,
    ToolbarModule,
    DialogsModule,
    PaginationModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
