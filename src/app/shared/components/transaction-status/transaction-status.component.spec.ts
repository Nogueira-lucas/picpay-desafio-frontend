import { TransactionStatusService } from './../../services/transaction-status/transaction-status.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionStatusComponent } from './transaction-status.component';
import { BackgroundTemplateTypes } from '../../interfaces/transaction-status.interface';

describe('TransactionStatusComponent', () => {

  let component: TransactionStatusComponent;
  let fixture: ComponentFixture<TransactionStatusComponent>;
  let transaction: TransactionStatusService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionStatusComponent ]
    })
    .compileComponents();

    transaction = TestBed.inject(TransactionStatusService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display component in screen', () => {
    const spy = spyOn(transaction, 'show').and.callThrough();

    transaction.show('ocorreu um erro inesperado', BackgroundTemplateTypes.error);

    transaction.transactionStatusState$.subscribe(data => {
      expect(data.displayMessage).toBeTruthy();
    });

    expect(spy).toHaveBeenCalled();
  });

  it('should hide component from screen', () => {
    const spy = spyOn(transaction, 'hide').and.callThrough();

    component.hide();

    transaction.transactionStatusState$.subscribe(data => {
      expect(data.displayMessage).toBeFalsy();
    });

    expect(spy).toHaveBeenCalled();
  });
});
