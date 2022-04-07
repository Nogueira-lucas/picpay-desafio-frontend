import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserFacade } from '../facade/user.facade';
import { AuthGuard } from './auth-guard.guard';

describe('AuthGuard', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const userFacadeSpy = jasmine.createSpyObj('UserFacade', ['getUser']);
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, CommonModule ],
      providers: [
        { provide: UserFacade, useValue: userFacadeSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    guard = TestBed.inject(AuthGuard);
  });

  it('be able to hit route when user is logged in', () => {
    userFacadeSpy.getUser.and.returnValue({ username: 'usuario@gmail.com', password: 'usuario' });
    expect(guard.canActivate()).toBeTrue();
  });

  it('not be able to hit route when user is not logged in', () => {
    userFacadeSpy.getUser.and.returnValue(null);
    expect(guard.canActivate()).toBeFalse();
  });
});
