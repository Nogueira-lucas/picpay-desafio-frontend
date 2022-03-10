import { BehaviorSubject } from 'rxjs';
import { ITransactionTemplateMessage, BackgroundTemplateTypes } from './../../interfaces/transaction-status.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionStatusService {

  private transactionStatusSubject = new BehaviorSubject<ITransactionTemplateMessage>(null);
  public transactionStatusState$ = this.transactionStatusSubject.asObservable();

  constructor() { }

  show(message: string, type: BackgroundTemplateTypes, displayMessage = true) {
    this.transactionStatusSubject.next({message, type, displayMessage});
  }

  hide(message: string = '', type = null, displayMessage = false) {
    this.transactionStatusSubject.next({message, type, displayMessage});
  }
}
