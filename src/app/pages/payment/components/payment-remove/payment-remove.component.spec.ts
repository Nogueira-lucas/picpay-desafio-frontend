import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentFacade } from 'src/app/facade/payment.facade';
import { SharedModule } from 'src/app/shared/shared.module';

import { PaymentRemoveComponent } from './payment-remove.component';

const paymentFacadeSpy = jasmine.createSpyObj('PaymentFacade', ['removePayment']);
const mockPayment = { id: 1, name: 'IronMan', value: 8, title: 'test title' }

describe('PaymentRomove Component Isolated Test', () => {
  let component: PaymentRemoveComponent;

  beforeEach(() => {
    component = new PaymentRemoveComponent(paymentFacadeSpy, new NgbActiveModal());
  });

  it('Component successfully created', () => {
    expect(component).toBeTruthy();
  });

  it('Property value must be updated from when you change input', (() => {
    component.payment = mockPayment
    expect(component.payment).toEqual(mockPayment);
  }));
});

describe('PaymentRomove Component Integrated Test', () => {
  let component: PaymentRemoveComponent;
  let fixture: ComponentFixture<PaymentRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentRemoveComponent ],
      providers: [ { provide: PaymentFacade, useValue: paymentFacadeSpy }, NgbActiveModal],
      imports: [ SharedModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('paymentFacade removePayment() should called ', fakeAsync(() => {
    component.payment = { id: 5 }
    
    spyOn(component, 'removePayment').and.callThrough();
    component.removePayment();

    expect(paymentFacadeSpy.removePayment.calls.any()).toBeTruthy();
    expect(paymentFacadeSpy.removePayment).toHaveBeenCalled(); 
  }));
});
