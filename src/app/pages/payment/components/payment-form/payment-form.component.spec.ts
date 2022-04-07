import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { PaymentFacade } from 'src/app/facade/payment.facade';
import { Payment } from 'src/app/models/payment.model';
import { SharedModule } from 'src/app/shared/shared.module';

import { PaymentFormComponent } from './payment-form.component';

const paymentFacadeSpy = jasmine.createSpyObj('PaymentFacade', ['updatePayment', 'addPayment']);
const mockPayment: Payment = { name: 'IronMan', value: 8, title: 'test title', date:'2021-01-28T11:01' }

describe('PaymentForm Component Isolated Test', () => {
  let fixture: ComponentFixture<PaymentFormComponent>;
  let component: PaymentFormComponent;

  function updateForm(payment: Payment) {
    component.form.controls.name.setValue(payment.name);
    component.form.controls.value.setValue(payment.value);
    component.form.controls.title.setValue(payment.title);
    component.form.controls.date.setValue(payment.date);
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PaymentFacade, useValue: paymentFacadeSpy },
        FormBuilder,
        NgbActiveModal
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule
      ],
      declarations: [PaymentFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentFormComponent);
    component = fixture.componentInstance
  }));

  it('Component successfully created', () => {
    expect(component).toBeTruthy();
  });

  it('Form value should update from when u change the input', (() => {
    updateForm(mockPayment);
    expect(component.form.value).toEqual(mockPayment);
  }));

  it('Form invalid should be true when form is invalid', (() => {
    updateForm(new Payment());
    expect(component.form.invalid).toBeTrue();
  }));
});

describe('PaymentForm Component Shallow Test', () => {
  let fixture: ComponentFixture<PaymentFormComponent>;
  let component: PaymentFormComponent;

  function updateForm(payment: Payment) {
    component.form.controls.name.setValue(payment.name);
    component.form.controls.value.setValue(payment.value);
    component.form.controls.title.setValue(payment.title);
    component.form.controls.date.setValue(payment.date);
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PaymentFacade, useValue: paymentFacadeSpy },
        FormBuilder,
        NgbActiveModal
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule
      ],
      declarations: [PaymentFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentFormComponent);
    component = fixture.componentInstance
  }));

  it('Created a form with input username, date, value and title', () => {
    const nameContainer = fixture.debugElement.nativeElement.querySelector('[name="name"]');
    const dateContainer = fixture.debugElement.nativeElement.querySelector('[name="date"]');
    const valueContainer = fixture.debugElement.nativeElement.querySelector('[name="value"]');
    const titleContainer = fixture.debugElement.nativeElement.querySelector('[name="title"]');

    expect(nameContainer).toBeDefined();
    expect(dateContainer).toBeDefined();
    expect(valueContainer).toBeDefined();
    expect(titleContainer).toBeDefined();
  });

  it('When the fields are blank, the inputs should show a red outline', () => {
    updateForm(new Payment());
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('[name="save"]');
    button.click();
    fixture.detectChanges();

    const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
    const nameInput = inputs[0];
    const valueInput = inputs[1];
    const dateInput = inputs[2];

    expect(nameInput.classList).toContain('ng-invalid');
    expect(dateInput.classList).toContain('ng-invalid');
    expect(valueInput.classList).toContain('ng-invalid');
  });
});


describe('PaymentForm Component Integrated Test', () => {
  let fixture: ComponentFixture<PaymentFormComponent>;
  let component: PaymentFormComponent;

  function updateForm(payment: Payment) {
    component.form.controls.name.setValue(payment.name);
    component.form.controls.value.setValue(payment.value);
    component.form.controls.title.setValue(payment.title);
    component.form.controls.date.setValue(payment.date);
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PaymentFacade, useValue: paymentFacadeSpy },
        FormBuilder,
        NgbActiveModal
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule
      ],
      declarations: [PaymentFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentFormComponent);
    component = fixture.componentInstance
  }));

  it('PaymentFacade addPayment() should called ', () => {
    const addPay = { ...mockPayment, id: 25523 };
    
    updateForm(mockPayment);
    fixture.detectChanges();

    paymentFacadeSpy.addPayment.and.returnValue(of(addPay));

    spyOn(component, 'savePayment').and.callThrough();
    component.savePayment();
    
    expect(paymentFacadeSpy.addPayment.calls.any()).toBeTruthy();
    expect(paymentFacadeSpy.addPayment).toHaveBeenCalled();
  });

  it('PaymentFacade updatePayment() should called ', () => {
    const addPay = { ...mockPayment, id: 25523 };
    component.payment = addPay;

    updateForm(mockPayment);
    fixture.detectChanges();

    paymentFacadeSpy.updatePayment.and.returnValue(of(addPay));

    spyOn(component, 'savePayment').and.callThrough();
    component.savePayment();
    
    expect(paymentFacadeSpy.updatePayment.calls.any()).toBeTruthy();
    expect(paymentFacadeSpy.updatePayment).toHaveBeenCalled();
  });
});
