import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { PaymentsService } from 'src/app/services/payments/payments.service';
import { finalize } from 'rxjs/operators';
import { Payment } from 'src/app/shared/models/payment';

@Component({
    selector: 'app-payment-modal',
    templateUrl: './payment-modal.component.html',
    styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent implements OnInit {
    @Input() payment: Payment;

    paymentForm: FormGroup;

    constructor(
        private paymentsService: PaymentsService,
        private alertService: AlertService,
        private modalService: NgbModal
    ) {}

    get name(): AbstractControl {
        return this.paymentForm.get('name');
    }

    get title(): AbstractControl {
        return this.paymentForm.get('title');
    }

    get value(): AbstractControl {
        return this.paymentForm.get('value');
    }

    get date(): AbstractControl {
        return this.paymentForm.get('date');
    }

    ngOnInit(): void {
        this.configureForm();
    }

    configureForm(): void {
        this.paymentForm = new FormGroup({
            id: new FormControl(this.payment?.id),
            name: new FormControl(this.payment?.name),
            title: new FormControl(this.payment?.title),
            value: new FormControl(this.payment?.value),
            date: new FormControl(this.payment?.date),
            username: new FormControl(this.payment?.username),
            isPayed: new FormControl(this.payment?.isPayed),
            image: new FormControl(this.payment?.image),
        });
    }

    save(): void {
        this.payment?.id ? this.updatePayment() : this.createPayment();
    }

    createPayment(): void {
        const request: Payment = this.createPaymentRequest();

        this.paymentsService
            .createPayment(request)
            .pipe(finalize(() => this.closeModal()))
            .subscribe(
                () => this.alertService.showSuccess('Oba! O pagamento foi criado com sucesso!'),
                () => this.alertService.showDanger('Ops... Ocorreu um erro ao atualizar o pgamaneto :(')
            );
    }

    updatePayment(): void {
        const request: Payment = this.createPaymentRequest();

        this.paymentsService
            .updatePayment(request)
            .pipe(finalize(() => this.closeModal()))
            .subscribe(
                () => this.alertService.showSuccess('Oba! O pagamento foi atualizado com sucesso!'),
                () => this.alertService.showDanger('Ops... Ocorreu um erro ao atualizar o pgamaneto :(')
            );
    }

    createPaymentRequest(): Payment {
        return {
            ...this.paymentForm.getRawValue(),
        };
    }

    closeModal(): void {
        this.modalService.dismissAll();
    }
}
