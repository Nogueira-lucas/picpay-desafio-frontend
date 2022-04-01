import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Payment } from "../models/payment.model";

@Injectable()
export class PaymentState {
  private payments$ = new BehaviorSubject<Payment[]>(null);

  getPayments$() {
    return this.payments$.asObservable();
  }

  setPayments(categories: Payment[]) {
    this.payments$.next(categories);
  }

  getPaymentId(paymentId: number) {
    const payments = this.payments$.getValue();
    return payments.find(payment => payment.id === paymentId)
  }

  addPayment(payment: Payment) {
    const currentValue = this.payments$.getValue();
    this.payments$.next([...currentValue, payment]);
  }

  updatePayment(paymentUpdade: Payment) {
    const payments = this.payments$.getValue();
    const indexOfUpdated = payments.findIndex(payment => payment.id === paymentUpdade.id);
    payments[indexOfUpdated] = paymentUpdade;
    this.payments$.next([...payments]);
  }

  updatePaymentId(paymentToReplace: Payment, addedPaymentWithId: Payment) {
    const payments = this.payments$.getValue();
    const updatedPaymentIndex = payments.findIndex(payment => payment === paymentToReplace);
    payments[updatedPaymentIndex] = addedPaymentWithId;
    this.payments$.next([...payments]);
  }

  removePayment(paymentRemove: Payment) {
    const currentValue = this.payments$.getValue();
    this.payments$.next(currentValue.filter(payment => payment !== paymentRemove));
  }
}