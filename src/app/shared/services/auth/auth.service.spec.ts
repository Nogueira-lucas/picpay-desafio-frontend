import { StorageService } from './../storage/storage.service';
import { IAccountUser } from './../../interfaces/account.interface';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { from, throwError } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpClient;
  let storage: StorageService;

  const USER_MOCK: IAccountUser[] = [{ id: 0, name: 'Usuário', avatar: '/assets/images/avatar_user.png', email: 'usuario@gmail.com', password: 'usuario' }]
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpClient);
    storage = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Validate login action', () => {
    it('should execute succesfully login request', (done) => {
      spyOn(http, 'get').and.returnValue(from([USER_MOCK]));

      service.login('usuario@gmail.com', 'usuario').subscribe(response => {
        expect(response).toBeDefined();
        expect(response).toEqual(USER_MOCK[0]);
        expect(service.isLoggedIn).toBeTruthy();
        done();
      });
    });

    it('should throws error when executing login request', (done) => {
      spyOn(http, 'get').and.returnValue(throwError(new Error()));

      service.login('usuario@gmail.com', 'teste').subscribe(_ => {},
        error => {
          expect(error).toBeDefined();
          done();
        }
      );
    });
  });

  describe('Validate logout action', () => {
    it('should execute succesfully logout', () => {
      const spy = spyOn(storage, 'clearStorage').and.callThrough();

      service.logout();
      expect(spy).toHaveBeenCalled();
      expect(service.isLoggedIn).toBeFalsy();
    });
  });
});
