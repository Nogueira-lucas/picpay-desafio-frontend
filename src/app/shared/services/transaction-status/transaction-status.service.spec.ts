import { TestBed } from '@angular/core/testing';
import { BackgroundTemplateTypes } from '../../interfaces/transaction-status.interface';

import { TransactionStatusService } from './transaction-status.service';

describe('TransactionStatusService', () => {
  let service: TransactionStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit observable and display transaction component', () => {
    const spy = spyOn(service, 'show').and.callThrough();

    service.show('ocorreu um erro inesperado', BackgroundTemplateTypes.error);
    expect(spy).toHaveBeenCalled();
  });

  it('should emit observable and hide transaction component', () => {
    const spy = spyOn(service, 'hide').and.callThrough();

    service.hide();
    expect(spy).toHaveBeenCalled();
  });
});
