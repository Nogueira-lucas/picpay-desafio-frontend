import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaymentService } from './payment.service';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment.model';

describe('Payment Service Test', () => {
  let injector: TestBed;
  let service: PaymentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentService],
    });

    injector = getTestBed();
    service = injector.get(PaymentService);
    httpMock = injector.get(HttpTestingController);
  });

  it('getPayments() should return data', () => {
    const nameUser = 'Viviyan'
    service.getPayments(nameUser).subscribe((res) => {
      expect(res.length).toBe(2);
    });

    const req = httpMock.expectOne(`${environment.API}/tasks?name_like=${nameUser}`);
    expect(req.request.method).toBe('GET');
    req.flush([new Payment(), new Payment()]);
  });

  it('createPayment() should POST and return data', () => {
    const mockPayment: Payment = { name: 'IronMan', value: 8, title: 'test title', date:'2021-01-28T11:01' }

    service.createPayment(mockPayment).subscribe((res) => {
      expect(res).toEqual(mockPayment);
    });

    const req = httpMock.expectOne(`${environment.API}/tasks`);
    expect(req.request.method).toBe('POST');
    req.flush(mockPayment);
  });

  afterEach(() => {
    httpMock.verify();
  });  
});