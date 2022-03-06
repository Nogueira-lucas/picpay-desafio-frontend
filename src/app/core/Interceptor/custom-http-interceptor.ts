import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http'
import { Observable, } from 'rxjs'
import { from } from 'rxjs'
import { AuthService } from 'src/app/services/auth.service'

@Injectable()
export class CustomHttpInterceptor {
  constructor(private auth: AuthService){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var observableFromPromise = from(this.handleAccess(request, next))
    return observableFromPromise
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
    Promise<HttpEvent<any>> {

    const headerSettings: { [name: string]: string | string[]; } = {}
    for (const key of request.headers.keys()) 
      headerSettings[key] = request.headers.getAll(key)   
    headerSettings['Authorization'] = 'Bearer ' + this.auth.token
    const newHeader = new HttpHeaders(headerSettings)
    return next.handle(request.clone({ headers: newHeader })).toPromise()
  }
}