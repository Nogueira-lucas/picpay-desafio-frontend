import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { LoginComponent } from 'src/app/pages/login/login.component';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { SERVER_URL } from 'src/app/config';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [{ path: 'login', component: LoginComponent }]
        )
      ]
    });
    service = TestBed.inject(AuthenticationService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform a get to /account with email and password', () => {
    const userName = 'userName';
    const password = 'password';
    const spy = spyOn(http, 'get').and.callThrough()
    service.login(userName,password);
    expect(spy).toHaveBeenCalledWith(SERVER_URL + '/account?email=userName');
  });

  it('should be created', () => {
    service.logout()
    expect(localStorage.getItem('user_session')).toBeNull();
  });

});
