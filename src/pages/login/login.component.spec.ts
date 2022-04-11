import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/core/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AccountService } from 'src/core/services/account/account.service';
import { Observable, of } from 'rxjs';

let mockData = null;

class MockAccountService {
  login(): Observable<any[]> {
    return mockData;
  }
}

describe('Component: Login', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [RouterTestingModule, MatSnackBarModule, FormsModule, MaterialModule,
                HttpClientTestingModule, BrowserAnimationsModule],
                providers: [
                    { provide: AccountService, useClass: MockAccountService }
                  ]
        })
            .compileComponents();

        router = TestBed.inject(Router);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('created component', () => {
        expect(component).toBeTruthy();
    });


    it(`Updating the value of the login form, with a valid email, so the value of the form must be changed`, () => {

        const params = { login: 'test@gmail.com' };
        component.emailFormControl.setValue('test@gmail.com');

        expect(component.emailFormControl.value).toEqual(params.login);

    });

    it(`Updating the value of the password form , Then the value of the form must be changed`, () => {

        const params = { password: 'test' };
        component.passwordFormControl.setValue('test');

        expect(component.passwordFormControl.value).toEqual(params.password);

    });

    it(`Validated invalid email`, () => {

        component.emailFormControl.setValue('testmail.com');

        expect(component.emailFormControl.invalid).toBe(true);

    });


    it(`Given a login-button
    when clicked
    Must redirect to 'task' route`, () => {
        spyOn(router, 'navigate');

        const loginDate = [
            {
              id: 0,
              name: 'usuario',
              email: 'usuario@gmail.com',
              password: 'usuario',
              token: '821367812638123123'
            }
          ];

        mockData = of(loginDate);

        component.emailFormControl.setValue('usuario@gmail.com');
        component.passwordFormControl.setValue('usuario');
        const loginButton = fixture.nativeElement.querySelector('.login-button');

        loginButton.click();

        fixture.whenStable().then(() => {
            expect(router.navigate).toHaveBeenCalledWith(['/task']);
        });

    });
});
