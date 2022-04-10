import { TestBed } from '@angular/core/testing';
import { AccountService } from './account.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

describe('Service: Account', () => {
  let service: AccountService;
  let httpController: HttpTestingController;
  const API_URL = environment.serverUrl + '/account';
  let httpClient: HttpClient;

  const mockAccountListResponseDto =
   [{
      id: 0,
      name: 'Test Login',
      email: 'test@gmail.com',
      password: 'test',
      token: '021367812638123120'
    }];


  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountService]
    });

    service = TestBed.inject(AccountService);
    httpController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`Given the AccountService
  When login method returns successfully
  Then it should return the user data`, () => {

    const params = {login: 'test@gmail.com', password: 'test'};

    service.login(params.login, params.password).subscribe(response => {
      expect(response.length).toEqual(1);
      expect(response[0].name).toEqual('Test Login');
    });

    const req = httpController.expectOne(`${API_URL}?login=${params.login}&password=${params.password}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockAccountListResponseDto);
  });

  it(`Given the AccountService
    When login method returns with error
    Then you must pass the error`, () => {
        let accountResponse;
        const params = {login: 'test@gmail.com', password: 'test'};

        spyOn(httpClient, 'get').and.returnValue(throwError({ status: 400 }));

        service.login(params.login, params.password).subscribe(() => { }, (err) => {
          accountResponse = err;
        });

        expect(accountResponse).toEqual({ status: 400 });
    });


});

