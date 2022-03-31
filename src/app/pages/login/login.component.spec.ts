import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const authServiceStub: jasmine.SpyObj<AuthenticationService> = jasmine.createSpyObj(
    'authenticationService',
    ['login']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule, 
        RouterTestingModule
      ],
      providers: [
        {
          provide: AuthenticationService,
          useValue: authServiceStub
        }
      ]
    })
    .compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke authentication service when submit', () => {
    const username = component.loginForm.controls.username;
    username.setValue('test@test.com');
    const password = component.loginForm.controls.password;
    password.setValue('123456');
    authServiceStub.login.and.returnValue(of());

    fixture.nativeElement.querySelector('#submitButton').click();

    expect(authServiceStub.login.calls.any()).toBeTruthy();
    expect(authServiceStub.login).toHaveBeenCalledWith(
      username.value,
      password.value
    );
  });

});
