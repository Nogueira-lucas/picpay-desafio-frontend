import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';

@Injectable()
export class HTTPStatus {
    private requestInFlight$: BehaviorSubject<boolean>;
    constructor() {
        this.requestInFlight$ = new BehaviorSubject(false);
    }
    setHttpStatus(inFlight: boolean) {
        this.requestInFlight$.next(inFlight);
    }
    getHttpStatus(): Observable<boolean> {
        return this.requestInFlight$.asObservable();
    }
}

@Injectable()
export class HTTPListener implements HttpInterceptor {
    private _requests = 0;
    constructor(private status: HTTPStatus, private loadPageService: LoadingService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        ++this._requests;

        this.status.setHttpStatus(true);
        this.loadPageService.start();

        return next.handle(req).pipe(
            map(event => {
                return event;
            }),
            catchError(error => {
                throw(error);
            }),
            finalize(() => {
                --this._requests;
                this.status.setHttpStatus(this._requests > 0);
                this.loadPageService.end();
            })
        );
    }
}