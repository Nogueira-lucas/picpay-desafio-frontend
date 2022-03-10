import { ErrorHandlerInterceptor } from './shared/interceptors/error-handler.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
  ],
  providers: [
    ToastrService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
