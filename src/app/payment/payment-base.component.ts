import { AfterViewInit, Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ButtonConfig } from 'src/app/_components/button/button-config';
import { PayModalService } from 'src/app/_components/modal/pay-modal.service';
import { Payment } from 'src/app/_models/payment';
import { PaymentService } from 'src/app/_services/payment.service';
import { NotifierService } from 'angular-notifier';

@Directive()
export abstract class PaymentBaseComponent implements OnInit, AfterViewInit {

    @Input() payment: Payment;
    @Output() submitSuccess = new EventEmitter();

    abstract modalId: string;
    
    cancelModalConfig: ButtonConfig;
    submitModalConfig: ButtonConfig;

    constructor(
        protected modalService: PayModalService,
        protected paymentService: PaymentService,
        protected formBuilder: FormBuilder,
        protected notifierService: NotifierService
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

    notify(type, message) {
        this.notifierService.notify(type, message);
        throw Error(message);
    }

    notifySuccess() {
        this.submitSuccess.emit();
        this.notifierService.notify('success', 'Sucesso!');
    }

    abstract submitModal(payment?: Payment): void;

}