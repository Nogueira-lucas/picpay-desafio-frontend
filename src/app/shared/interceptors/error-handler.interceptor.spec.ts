import { TaskService } from '../../pages/tasks/services/task/task.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';

import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { HttpClient, HttpErrorResponse, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

describe('ErrorHandlerInterceptor', () => {
  let taskService: TaskService;
  let http: HttpClient;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ToastrModule.forRoot()
    ],
    providers: [
      ErrorHandlerInterceptor,
      {
        multi: true,
        provide: HTTP_INTERCEPTORS,
        useExisting: ErrorHandlerInterceptor,
      }
      ]
    })
  );

  it('should be created', () => {
    const interceptor: ErrorHandlerInterceptor = TestBed.inject(ErrorHandlerInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should execute request and throws error', () => {
    taskService = TestBed.inject(TaskService);
    http = TestBed.inject(HttpClient);
    spyOn(http, 'get').and.returnValue(throwError(new Error()));

    taskService.getTasks(1, 10).subscribe(data => {},
      error => {
      expect(error).toBeDefined();
    });
  });
});
