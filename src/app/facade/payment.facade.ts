import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { Payment } from "../models/payment.model";
import { PaymentService } from "../services/payment.service";
import { PaymentState } from "../state/payment.state";

@Injectable()
export class PaymentFacade {

  constructor(private paymentService: PaymentService, private paymentState: PaymentState) { }

  getPayments$(): Observable<Payment[]> {
    return this.paymentState.getPayments$();
  }

  loadPayments() {
    return this.paymentService.getPayments()
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
        },
        (error) => {
          this.paymentState.removePayment(payment);
          throwError(error);
          alert('Ops! Algo deu erro.')
        }
      );
  }

  updatePayment(payment: Payment) {   
      this.paymentService.updatePayment(payment)
        .subscribe(
            () => {
                this.paymentState.updatePayment(payment);
                alert('Pagamento criado com sucesso.');
            },
            (error) => {
                throwError(error);
                alert('Ops! Algo deu erro.')
            }
        )
  }
}