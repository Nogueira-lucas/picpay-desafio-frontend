import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginGuard } from './login.guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/core/material/material.module';
import { TaskGuard } from './task.guard';
import { Router } from '@angular/router';

describe('TaskGuard', () => {
  let guard: TaskGuard;
  const routeMock: any = { snapshot: {}};
  const routeStateMock: any = { snapshot: {}, url: '/login'};
  const routerMock = {navigate: jasmine.createSpy('navigate')};

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [RouterTestingModule, MatSnackBarModule, BrowserAnimationsModule, MaterialModule],
        providers: [TaskGuard, { provide: Router, useValue: routerMock }, ],
    });
    guard = TestBed.inject(TaskGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  afterEach(() => {
    localStorage.removeItem('token');
  });

  it('User is authenticated', inject([TaskGuard], (service: LoginGuard) => {
    localStorage.setItem('token', '821367812638123123');
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
  }));

});
