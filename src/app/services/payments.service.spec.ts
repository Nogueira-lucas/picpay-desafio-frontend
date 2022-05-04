import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material.module';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing'
import { PaymentsService } from './payments.service';

describe('PaymentsService', () => {
  let service: PaymentsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, MaterialModule, RouterTestingModule ],
      providers: [
        PaymentsService
      ]
    })

    service = TestBed.inject(PaymentsService)
  })

  it('should execute login', inject([PaymentsService], (service: PaymentsService) => {
    const spy = spyOn(service, 'getPaymentBy')
    service.getPaymentBy(177)
    expect(spy).toHaveBeenCalled()
    expect(spy).not.toThrow()
    })
  )
  
});