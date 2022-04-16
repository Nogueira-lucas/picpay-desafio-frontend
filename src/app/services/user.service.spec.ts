import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserService', () => {
  let injector: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [UserService],
    });

    injector = getTestBed();
    service = injector.inject(UserService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('getUsers() should return data', () => {
    const validUser = { email: 'usuario@gmail.com', password: 'usuario' };
    service.getUsers(validUser.email, validUser.password).subscribe(res => {
      expect(res).toEqual([validUser]);
    });

    const req = httpMock.expectOne(
      `${environment.API}/account?email=${validUser.email}&password=${validUser.password}`
    );
    expect(req.request.method).toBe('GET');
    req.flush([validUser]);
  });
});
