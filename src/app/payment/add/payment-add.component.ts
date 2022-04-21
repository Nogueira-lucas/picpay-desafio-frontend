import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputConfig } from 'src/app/_components/input/InputConfig';
import { Payment } from 'src/app/_models/payment';
import { PaymentBaseComponent } from '../payment-base.component';

@Component({
    selector: 'payment-add',
    templateUrl: 'payment-add.component.html',
    styleUrls: ['payment-add.component.scss']
})
export class PaymentAddComponent extends PaymentBaseComponent {

    @Input() payment: Payment;

    modalId = "add-payment-modal";
    addForm: FormGroup;

    userInputConfig: InputConfig;
    valueInputConfig: InputConfig;
    dateInputConfig: InputConfig;
    titleInputConfig: InputConfig;
    
    get f() { return this.addForm.controls; }

    ngOnInit(): void {
        super.ngOnInit()

        this.addForm = new FormGroup({
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

    }
    
    submitModal() {
        this.payment = this.paymentFrom(this.f);

        this.paymentService.create(this.payment).subscribe(() => {
            super.closeModal();
        }, err => {
            super.closeModal();
        })
    }

    paymentFrom(groupForm): Payment {
        const newPayment = new Payment()

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