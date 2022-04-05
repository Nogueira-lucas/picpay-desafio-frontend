import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { Payment } from "../models/payment.model";
import { NotificationService } from "../services/notification.service";
import { PaymentService } from "../services/payment.service";
import { PaymentState } from "../state/payment.state";

@Injectable()
export class PaymentFacade {

  constructor(private paymentService: PaymentService,
              private paymentState: PaymentState,
              private notifyService: NotificationService) { }

  getPayments$(): Observable<Payment[]> {
    return this.paymentState.getPayments$();
  }

  loadPayments() {
    return this.paymentService.getPayments()
      .pipe(tap(payments => this.paymentState.setPayments(payments)));
  }

  loadPaymentsByUser(userName) {
    return this.paymentService.getPayments(userName)
      .pipe(tap(payments => this.paymentState.setPayments(payments)));
  }

  getPaymentId(paymentId: number) {
      return this.paymentState.getPaymentId(paymentId)
  }

  addPayment(payment: Payment) {
    this.paymentState.addPayment(payment);
    this.paymentService.createPayment(payment)
      .subscribe(
        (addedPaymentWithId: Payment) => {
          this.paymentState.updatePaymentId(payment, addedPaymentWithId)
          this.notifyService.showSuccess("Pagamento criado com sucesso.")
        },
        (error) => {
          this.paymentState.removePayment(payment.id);
          this.notifyService.showError("Algo deu erro.", "Ops!")
          throwError(error);
        }
      );
  }

  updatePayment(payment: Payment) {   
      this.paymentService.updatePayment(payment)
        .subscribe(
            () => {
              this.paymentState.updatePayment(payment);
              this.notifyService.showSuccess("Pagamento atualizado com sucesso.");
            },
            (error) => {
              this.notifyService.showError("Algo deu erro.", "Ops!")
              throwError(error);
            }
        )
  }

  removePayment(paymentId: number) {
    this.paymentService.removePayment(paymentId)
      .subscribe(
        () => {
          this.paymentState.removePayment(paymentId)
          this.notifyService.showSuccess("Pagamento excluido com sucesso.");
        },
        (error) => {
          this.notifyService.showError("Algo deu erro.", "Ops!")
          throwError(error);
        }
      )
  }
}