import { Injectable } from '@angular/core';
import { Observable, Subscription, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Payment } from '../models/payment.model';
import { NotificationService } from '../services/notification.service';
import { PaymentService } from '../services/payment.service';
import { PaymentState } from '../state/payment.state';

@Injectable()
export class PaymentFacade {

  constructor(private paymentService: PaymentService,
              private paymentState: PaymentState,
              private notifyService: NotificationService) { }

  getPayments$(): Observable<Payment[]> {
    return this.paymentState.getPayments$();
  }

  loadPayments(): Observable<Payment[]> {
    return this.paymentService.getPayments()
      .pipe(tap(payments => this.paymentState.setPayments(payments)));
  }

  loadPaymentsByUser(userName): Observable<Payment[]> {
    return this.paymentService.getPayments(userName)
      .pipe(tap(payments => this.paymentState.setPayments(payments)));
  }

  getPaymentId(paymentId: number): Payment {
      return this.paymentState.getPaymentId(paymentId);
  }

  addPayment(payment: Payment): Observable<Subscription> {
    this.paymentState.addPayment(payment);
    return new Observable((observer) => {
      const request = this.paymentService.createPayment(payment)
        .subscribe(
          (addedPaymentWithId: Payment) => {
            this.paymentState.updatePaymentId(payment, addedPaymentWithId);
            this.notifyService.showSuccess('Pagamento criado com sucesso.');
            observer.next(request);
          },
          (error) => {
            this.paymentState.removePayment(payment.id);
            this.notifyService.showError('Algo deu erro.', 'Ops!');
            observer.next(request);
            throwError(error);
          }
        );
    });
  }

  updatePayment(payment: Payment): Observable<Subscription> {
    return new Observable((observer) => {
      const request = this.paymentService.updatePayment(payment)
        .subscribe(
          () => {
            this.paymentState.updatePayment(payment);
            this.notifyService.showSuccess('Pagamento atualizado com sucesso.');
            observer.next(request);
          },
          (error) => {
            this.notifyService.showError('Algo deu erro.', 'Ops!');
            observer.next(request);
            throwError(error);
          }
        );
    });
  }

  removePayment(paymentId: number): Observable<Subscription> {
    debugger
    return new Observable((observer) => {
      const request = this.paymentService.removePayment(paymentId)
      .subscribe(
        () => {
          this.paymentState.removePayment(paymentId);
          this.notifyService.showSuccess('Pagamento excluido com sucesso.');
          observer.next(request);
        },
        (error) => {
          this.notifyService.showError('Algo deu erro.', 'Ops!');
          observer.next(request);
          throwError(error);
        }
      );
    })
  }
}
