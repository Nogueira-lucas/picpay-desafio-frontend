import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonConfig } from '../_components/button/ButtonConfig';
import { InputConfig } from '../_components/input/InputConfig';
import { PayModalService } from '../_components/modal/pay-modal.service';
import { Payment } from '../_models/payment';
import { PaymentService } from '../_services/payment.service';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

    modalForm: FormGroup;
    addButtonConfig: ButtonConfig;

    userInputConfig: InputConfig;
    valueInputConfig: InputConfig;
    dateInputConfig: InputConfig;
    titleInputConfig: InputConfig;

    cancelModalConfig: ButtonConfig;
    submitModalConfig: ButtonConfig;

    modalId = "add-task-modal"

    modalLoading = false;

    constructor(
        private payModalService: PayModalService,
        private paymentService: PaymentService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.addButtonConfig = {
            label: "Adicionar Pagamento",
            primary: true
        }

        this.setupModalForm()
    }

    get f() { return this.modalForm.controls; }

    openModal() {
        this.payModalService.open(this.modalId);
    }

    setupModalForm() {
        this.modalForm = this.formBuilder.group({
            name: ["", Validators.required],
            value: ["", Validators.required],
            date: ["", Validators.required],
            title: [""],
        });

        this.userInputConfig = {
            label: "Usuário",
            controlName: "name",
            type: "text"
        }
        this.valueInputConfig = {
            label: "Valor",
            controlName: "value",
            type: "text"
        }
        this.dateInputConfig = {
            label: "Data",
            controlName: "date",
            type: "text"
        }
        this.titleInputConfig = {
            label: "Título",
            controlName: "title",
            type: "text"
        }

        this.cancelModalConfig = {
            label: "Cancelar"
        }
        this.submitModalConfig = {
            label: "Adicionar Pagamento",
            primary: true
        }
    }

    cancelModal() {
        this.payModalService.close(this.modalId);
    }

    submitModal() {
        this.modalLoading = true;

        const newPayment = this.newPaymentFrom(this.f)

        this.paymentService.create(newPayment).subscribe(response => {
            this.modalLoading = false;
            this.payModalService.close(this.modalId);
        })
    }

    private newPaymentFrom(groupForm): Payment {
        const newPayment = new Payment()

        newPayment.name = groupForm.name.value
        newPayment.username = ""
        newPayment.title = groupForm.title.value
        newPayment.value = groupForm.value.value
        newPayment.date = groupForm.date.value
        newPayment.image = ""
        newPayment.isPayed = false

        return newPayment;
    }

}