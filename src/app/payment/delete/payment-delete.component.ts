import { Component, Input } from '@angular/core';
import { Payment } from 'src/app/_models/payment';
import { PaymentBaseComponent } from '../payment-base.component';

@Component({
    selector: 'payment-delete',
    templateUrl: 'payment-delete.component.html',
    styleUrls: ['payment-delete.component.scss']
})
export class PaymentDeleteComponent extends PaymentBaseComponent {

    @Input() payment: Payment;

    modalId = "delete-payment-modal";
    
    submitModal() {
        this.paymentService.delete(this.payment.id).subscribe(data => {
            super.notifySuccess();
            super.closeModal();
        }, err => {
            super.closeModal();
        })
    }

    closeModal = () => super.closeModal();

}