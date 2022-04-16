import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaymentService } from './payment.service';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment.model';

describe('PaymentService', () => {
  let injector: TestBed;
  let service: PaymentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentService],
    });

    injector = getTestBed();
    service = injector.inject(PaymentService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('loadPayments() should return data', () => {
    const username = 'Viviyan';
    const pagination = { pageCurrent: 1, pageSize: 10 };
    service.loadPayments(1, 10, username).subscribe(res => {
      expect(res.body.length).toBe(2);
    });

    const req = httpMock.expectOne(
      `${environment.API}/tasks?_page=${pagination.pageCurrent}&_limit=${pagination.pageSize}&name_like=${username}`
    );
    expect(req.request.method).toBe('GET');
    req.flush([new Payment(), new Payment()]);
  });

  it('addPayment() should POST and return data', () => {
    const mockPayment: Payment = { name: 'IronMan', value: 8, title: 'test title', date: '2021-01-28T11:01' };

    service.addPayment(mockPayment).subscribe(res => {
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
