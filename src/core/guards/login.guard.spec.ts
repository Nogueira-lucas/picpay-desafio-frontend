import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginGuard } from './login.guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/core/material/material.module';
import { Router } from '@angular/router';


describe('LoginGuard', () => {
  let guard: LoginGuard;
  const routeMock: any = { snapshot: {}};
  const routeStateMock: any = { snapshot: {}, url: '/task'};
  const routerMock = {navigate: jasmine.createSpy('navigate')};

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [RouterTestingModule, MatSnackBarModule, BrowserAnimationsModule, MaterialModule],
        providers: [LoginGuard, { provide: Router, useValue: routerMock }, ],
    });
    guard = TestBed.inject(LoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  afterEach(() => {
    localStorage.removeItem('token');
  });

  it('User is not authenticated', inject([LoginGuard], (service: LoginGuard) => {
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
  }));
});
