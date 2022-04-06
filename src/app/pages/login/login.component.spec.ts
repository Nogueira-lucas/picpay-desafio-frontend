import { waitForAsync, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserFacade } from 'src/app/facade/user.facade';
import { UserState } from 'src/app/state/user.state';

import { LoginComponent } from './login.component';

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
const loginFacadeSpy = jasmine.createSpyObj('UserFacade', ['login']);

const validUser = { username: 'usuario@gmail.com', password: 'usuario' };
const blankUser = { username: '', password: '' };

describe('Login Component Isolated Test', () => {
  let component: LoginComponent;

  function updateForm(userEmail, userPassword) {
    component.form.controls.username.setValue(userEmail);
    component.form.controls.password.setValue(userPassword);
  }

  beforeEach(() => {
    component = new LoginComponent(routerSpy, new FormBuilder(), loginFacadeSpy);
  });

  it('Component successfully created', () => {
    expect(component).toBeTruthy();
  });

  it('Form value should update from when u change the input', (() => {
    updateForm(validUser.username, validUser.password);
    expect(component.form.value).toEqual(validUser);
  }));

  it('Form invalid should be true when form is invalid', (() => {
    updateForm(blankUser.username, blankUser.password);
    expect(component.form.invalid).toBeTrue();
  }));
});

describe('Login Component Shallow Test', () => {
  let fixture: ComponentFixture<LoginComponent>;

  function updateForm(userEmail, userPassword) {
    fixture.componentInstance.form.controls.username.setValue(userEmail);
    fixture.componentInstance.form.controls.password.setValue(userPassword);
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        { provide: UserFacade, useValue: loginFacadeSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder,
      ],
      declarations: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
  }));

  it('Created a form with username and password input and login button', () => {
    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#username-container');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password-container');
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#login-btn-container');
    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });

  it('When username and password is blank, password field should display red outline', () => {
    updateForm(blankUser.username, blankUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
    const userNameInput = inputs[0];
    const passwordInput = inputs[1];

    expect(userNameInput.classList).toContain('ng-invalid');
    expect(passwordInput.classList).toContain('ng-invalid');
  });
});

describe('Login Component Integrated Test', () => {
  let fixture: ComponentFixture<LoginComponent>;

  function updateForm(userEmail, userPassword) {
    fixture.componentInstance.form.controls.username.setValue(userEmail);
    fixture.componentInstance.form.controls.password.setValue(userPassword);
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        { provide: UserFacade, useValue: loginFacadeSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder
      ],
      declarations: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
  }));

  it('loginFacade login() should called ', () => {
    updateForm(validUser.username, validUser.password);
    fixture.detectChanges();

    loginFacadeSpy.login.and.returnValue(of([validUser]));
    
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(loginFacadeSpy.login.calls.any()).toBeTruthy();
    expect(loginFacadeSpy.login).toHaveBeenCalledWith(validUser.username, validUser.password);
  });
});
