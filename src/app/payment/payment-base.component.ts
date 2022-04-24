import { AfterViewInit, Directive, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ButtonConfig } from 'src/app/_components/button/button-config';
import { PayModalService } from 'src/app/_components/modal/pay-modal.service';
import { Payment } from 'src/app/_models/payment';
import { PaymentService } from 'src/app/_services/payment.service';

@Directive()
export abstract class PaymentBaseComponent implements OnInit, AfterViewInit {

    @Input() payment: Payment;

    abstract modalId: string;
    
    cancelModalConfig: ButtonConfig;
    submitModalConfig: ButtonConfig;

    constructor(
        protected modalService: PayModalService,
        protected paymentService: PaymentService,
        protected formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.cancelModalConfig = {
            label: 'Cancelar'
        }

        this.submitModalConfig = {
            label: 'Salvar',
            type: 'primary'
        }
    }

    ngAfterViewInit(): void {
        this.modalService.open(this.modalId);
    }

    closeModal(): void {
        this.modalService.close(this.modalId);
    }

    abstract submitModal(payment?: Payment): void;

}