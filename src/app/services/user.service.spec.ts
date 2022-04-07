import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';

describe('Users Service Test', () => {
  let injector: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    injector = getTestBed();
    service = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
  });

  it('getUsers() should return data', () => {
    const validUser = { email: 'usuario@gmail.com', password: 'usuario' };
    service.getUsers(validUser.email, validUser.password).subscribe((res) => {
      expect(res).toEqual([validUser]);
    });

    const req = httpMock.expectOne(`${environment.API}/account?email=${validUser.email}&password=${validUser.password}`);
    expect(req.request.method).toBe('GET');
    req.flush([validUser]);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
