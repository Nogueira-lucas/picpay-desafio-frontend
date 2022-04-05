import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentRemoveComponent } from './payment-remove.component';

describe('PaymentRemoveComponent', () => {
  let component: PaymentRemoveComponent;
  let fixture: ComponentFixture<PaymentRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentRemoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
