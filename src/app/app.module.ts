import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { HTTPListener, HTTPStatus } from './core/Interceptor/loader-interceptor';
import { GlobalErrorHandler } from './core/Interceptor/ErrorHandler';
import { CustomHttpInterceptor } from './core/Interceptor/custom-http-interceptor';


const RxJS_Services = [HTTPListener, HTTPStatus];

@NgModule({
  declarations: [
    AppComponent
  ],
  exports:[
    PagesModule
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [
    RxJS_Services,
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true } , 
    { provide: HTTP_INTERCEPTORS, useClass: HTTPListener, multi: true },
    { provide: ErrorHandler,  useClass: GlobalErrorHandler },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
