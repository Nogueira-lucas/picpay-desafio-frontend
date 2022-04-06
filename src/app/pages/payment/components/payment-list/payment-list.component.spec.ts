import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { of } from 'rxjs';
import { PaymentFacade } from 'src/app/facade/payment.facade';
import { Payment } from 'src/app/models/payment.model';
import { SharedModule } from 'src/app/shared/shared.module';

import { PaymentListComponent } from './payment-list.component';

const mockPayments: Payment[] = [
  { id: 1, name: 'IronMan', value: 8, title: 'test title' },
  { id: 2, name: 'Batman', value: 8, title: 'test title' },
  { id: 3, name: 'CaptainAmerica', value: 7, title: 'test title' },
  { id: 4, name: 'SuperMan', value: 9, title: 'test title' }
]

const paymentFacadeSpy = jasmine.createSpyObj('PaymentFacade', ['getPayments$', 'loadPayments', 'loadPaymentsByUser']);

describe('PaymentRomove Component Isolated Test', () => {
  let fixture: ComponentFixture<PaymentListComponent>;
  let component: PaymentListComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [SharedModule, NgxDatatableModule, FormsModule],
      providers: [
        { provide: PaymentFacade, useValue: paymentFacadeSpy },
        NgbModal
      ],
      declarations: [PaymentListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentListComponent);
    component = fixture.componentInstance
  }));

  it('Component successfully created', () => {
    expect(component).toBeTruthy();
  });

  it('Property value must be updated from when you change input', (() => {
    component.paymentList$ = of(mockPayments)
    component.paymentList$.subscribe(payments => {expect(payments).toEqual(mockPayments); })
  }));
});

describe('PaymentRomove Component Shallow Test', () => {
  let fixture: ComponentFixture<PaymentListComponent>;
  let component: PaymentListComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [SharedModule, NgxDatatableModule, FormsModule],
      providers: [
        { provide: PaymentFacade, useValue: paymentFacadeSpy },
        NgbModal
      ],
      declarations: [PaymentListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentListComponent);
    component = fixture.componentInstance
  }));

  it('Created a datatable with four rows', () => {
    paymentFacadeSpy.loadPayments.and.returnValue(of());
    component.ngOnInit()
    fixture.detectChanges();
    
    component.paymentList$ = of(mockPayments);
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('datatable-row-wrapper')).length).toBe(4);
  });
});

describe('PaymentList Component Integrated Test', () => {
  let fixture: ComponentFixture<PaymentListComponent>;
  let component: PaymentListComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [SharedModule, NgxDatatableModule, FormsModule],
      providers: [
        { provide: PaymentFacade, useValue: paymentFacadeSpy },
        NgbModal
      ],
      declarations: [PaymentListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentListComponent);
    component = fixture.componentInstance
  }));

  it('paymentFacadeSpy loadPayments() should called ', () => {
    paymentFacadeSpy.loadPayments.and.returnValue(of());
    component.ngOnInit()
    fixture.detectChanges();

    expect(paymentFacadeSpy.loadPayments.calls.any()).toBeTruthy();
    expect(paymentFacadeSpy.loadPayments).toHaveBeenCalled();
  });

  it('paymentFacadeSpy loadPaymentsByUser() should called ', () => {
    paymentFacadeSpy.loadPaymentsByUser.and.returnValue(of(mockPayments));
    
    spyOn(component, 'changedSearch').and.callThrough();
    component.changedSearch('CaptainAmerica')

    expect(paymentFacadeSpy.loadPaymentsByUser.calls.any()).toBeTruthy();
    expect(paymentFacadeSpy.loadPaymentsByUser).toHaveBeenCalled();
  });
});
