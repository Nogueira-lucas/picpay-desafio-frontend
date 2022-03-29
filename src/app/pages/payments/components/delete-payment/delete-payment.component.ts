import { Component, Input, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert/alert.service';
import { PaymentsService } from 'src/app/services/payments/payments.service';
import { Payment } from 'src/app/shared/models/payment';

@Component({
    selector: 'app-delete-payment',
    templateUrl: './delete-payment.component.html',
    styleUrls: ['./delete-payment.component.scss'],
})
export class DeletePaymentComponent {
    @Input()
    public payment: Payment;

    constructor(
        private modalService: NgbModal,
        private paymentService: PaymentsService,
        private alertService: AlertService
    ) {}

    deletePayment(payment: Payment): void {
        const id = payment.id;
        this.paymentService
            .deletePayment(id)
            .pipe(finalize(() => this.closeModal()))
            .subscribe(
                () => this.alertService.showSuccess('Oba! O pagamento foi removido com sucesso!'),
                () => this.alertService.showDanger('Ops... Algo deu errado :(')
            );
    }

    closeModal(): void {
        this.modalService.dismissAll();
    }
}
