import { AuthService } from './../../shared/services/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';

import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { from, throwError } from 'rxjs';
import { IAccountUser } from 'src/app/shared/interfaces/account.interface';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;
  let authService: AuthService;
  let http: HttpClient;

  const USER_MOCK: IAccountUser = { id: 0, name: 'Usuário', avatar: '/assets/images/avatar_user.png', email: 'usuario@gmail.com', password: 'usuario' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: '', redirectTo: 'tasks', pathMatch: 'full' }]),
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule],
      providers: []
    })
      .compileComponents();


    authService = TestBed.inject(AuthService);
    http = TestBed.inject(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Validate Login Suite', () => {
    it('should validate form as invalid', fakeAsync(() => {
      debugElement = fixture.debugElement;

      const emailInput = debugElement.query(By.css('#email')).nativeElement;
      const passwordInput = debugElement.query(By.css('#password')).nativeElement;


      expect(emailInput.value).toEqual('');
      expect(passwordInput.value).toEqual('');
      component.onSubmit();

    }));

    it('should execute login method correctly', fakeAsync(() => {
    debugElement = fixture.debugElement;
    const loginSpy = spyOn(authService, 'login').and.callThrough().and.returnValue(from([USER_MOCK]));

    const emailInput = debugElement.query(By.css('#email')).nativeElement;
    const passwordInput = debugElement.query(By.css('#password')).nativeElement;

    emailInput.value = 'usuario@gmail.com';
    passwordInput.value = 'usuario';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(emailInput.value).toEqual(component.form.get('email').value);
      expect(passwordInput.value).toEqual(component.form.get('password').value);
      expect(component.form.errors).toBeNull();
    });

    tick(2501);
    component.onSubmit();
    expect(loginSpy).toHaveBeenCalled();
  }));

    it('should execute login method and throw error', fakeAsync(() => {
    debugElement = fixture.debugElement;

    const loginSpy = spyOn(authService, 'login').and.returnValue(throwError(new Error()));

    const emailInput = debugElement.query(By.css('#email')).nativeElement;
    const passwordInput = debugElement.query(By.css('#password')).nativeElement;

    emailInput.value = 'usuario@gmail.com';
    passwordInput.value = 'teste123';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(emailInput.value).toEqual(component.form.get('email').value);
      expect(passwordInput.value).toEqual(component.form.get('password').value);
      expect(component.form.errors).toBeNull();
    });

    tick(2501);
    component.onSubmit();
    expect(loginSpy).toHaveBeenCalled();
  }));
});
});
