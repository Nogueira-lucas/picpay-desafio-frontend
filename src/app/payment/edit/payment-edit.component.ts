import { AfterContentInit, AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputConfig } from 'src/app/_components/input/input-config';
import { Payment } from 'src/app/_models/payment';
import { PaymentBaseComponent } from '../payment-base.component';

@Component({
    selector: 'payment-edit',
    templateUrl: 'payment-edit.component.html',
    styleUrls: ['payment-edit.component.scss']
})
export class PaymentEditComponent extends PaymentBaseComponent {

    @Input() payment: Payment;

    modalId = "edit-payment-modal";
    editForm: FormGroup;

    userInputConfig: InputConfig;
    valueInputConfig: InputConfig;
    dateInputConfig: InputConfig;
    titleInputConfig: InputConfig;
    
    get f() { return this.editForm.controls; }

    ngOnInit(): void {
        super.ngOnInit()

        this.editForm = new FormGroup({
            name: new FormControl(""),
            value: new FormControl(""),
            date: new FormControl(""),
            title: new FormControl("")
        });

        this.userInputConfig = {
            label: "Usuário",
            controlName: "name",
            type: "text"
        }
        this.valueInputConfig = {
            label: "Valor",
            controlName: "value",
            type: "number"
        }
        this.dateInputConfig = {
            label: "Data",
            controlName: "date",
            type: "date"
        }
        this.titleInputConfig = {
            label: "Título (Opcional)",
            controlName: "title",
            type: "text"
        }

    }
    
    submitModal(payment) {
        this.payment = this.paymentFrom(this.f, payment.id);

        this.paymentService.update(this.payment).subscribe(() => {
            super.closeModal();
        }, err => {
            super.closeModal();
        })
    }

    paymentFrom(groupForm, id): Payment {
        const newPayment = new Payment()

        if (groupForm.name.value === "" || groupForm.value.value === "" || groupForm.date.value === "") super.notify("warning", "Revisar campos obrigatórios.")

        newPayment.id = id;
        newPayment.name = groupForm.name.value;
        newPayment.username = "";
        newPayment.title = groupForm.title.value;
        newPayment.value = groupForm.value.value;
        newPayment.date = groupForm.date.value;
        newPayment.image = "";
        newPayment.isPayed = false;

        return newPayment;
    }

    closeModal = () => super.closeModal();
}