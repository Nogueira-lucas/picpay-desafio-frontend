
// Other imports
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material.module';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, MaterialModule, RouterTestingModule ],
      providers: [
        AuthService
      ]
    })

    service = TestBed.inject(AuthService)
  })

  /// HeroService method tests begin ///

  it('should execute login', inject([AuthService], (service: AuthService) => {
    const loginSpy = spyOn(service, 'login')
    service.login('lucas@gmail.com', '123')
    expect(loginSpy).not.toThrow()
    expect(loginSpy).toHaveBeenCalled()
    })
  )
  
  it('should execute logout', inject([AuthService], (service: AuthService) => {
    const logoutSpy = spyOn(service, 'logout')
    service.logout()
    expect(logoutSpy).not.toThrow()
    expect(logoutSpy).toHaveBeenCalled()
    })
  )
  
});


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/