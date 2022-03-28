import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUpdatePaymentComponent } from './new-update-payment.component';

describe('NewUpdatePaymentComponent', () => {
  let component: NewUpdatePaymentComponent;
  let fixture: ComponentFixture<NewUpdatePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUpdatePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUpdatePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
