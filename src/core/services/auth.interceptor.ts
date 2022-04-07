import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Injectable, Injector } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "../../../node_modules/@angular/router";
import { catchError } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private router: Router;

    constructor(
        private injector: Injector,
        //private snackar: MatSnackBar
    ) {
       // this.router = this.injector.get(Router);
    }


    /*intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let requestWithHeaders: HttpRequest<any> = this.handleRequestHeaders(request)

        return next.handle(requestWithHeaders);
    }*/

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(next.handle(request));
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }

    private handleResponseHeaderAccessToken(event: HttpResponse<any>) {

    }

    private handleRequestHeaders( req : HttpRequest<any>) : HttpRequest<any>{

        let requestWithHeaders : HttpRequest<any>

        return requestWithHeaders;
    }


}