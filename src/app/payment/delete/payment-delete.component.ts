import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ButtonConfig } from 'src/app/_components/button/ButtonConfig';
import { PayModalService } from 'src/app/_components/modal/pay-modal.service';
import { Payment } from 'src/app/_models/payment';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
    selector: 'payment-delete',
    templateUrl: 'payment-delete.component.html',
    styleUrls: ['payment-delete.component.scss']
})
export class PaymentDeleteComponent implements OnInit, AfterViewInit {

    @Input() payment: Payment;

    deleteModalId = "delete-payment-modal";
    
    cancelModalConfig: ButtonConfig;
    submitModalConfig: ButtonConfig;

    constructor(
        private modalService: PayModalService,
        private payModalService: PayModalService,
        private paymentService: PaymentService
    ) { }

    ngOnInit(): void {
        this.cancelModalConfig = {
            label: "Cancelar"
        }

        this.submitModalConfig = {
            label: "Salvar",
            primary: true
        }
    }

    ngAfterViewInit(): void {
        this.modalService.open(this.deleteModalId);
    }

    cancelModal() {
        this.payModalService.close(this.deleteModalId);
    }

    submitModal() {
        this.deletePayment();
        this.payModalService.close(this.deleteModalId);
    }

    deletePayment() {
        this.paymentService.delete(this.payment.id).subscribe(data => {
            console.log(data);
        }, err => {
            console.log(err);
        })
    }

}