import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePaymentModalComponent } from './manage-payment-modal.component';

describe('ManagePaymentModalComponent', () => {
  let component: ManagePaymentModalComponent;
  let fixture: ComponentFixture<ManagePaymentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePaymentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
