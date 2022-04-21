import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonConfig } from '../_components/button/ButtonConfig';
import { InputConfig } from '../_components/input/InputConfig';
import { PayModalService } from '../_components/modal/pay-modal.service';

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
    subitModalConfig: ButtonConfig;

    modalId = "addTaskModal"

    modalLoading = false;

    constructor(
        private payModalService: PayModalService,
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
            user: ["", Validators.required],
            value: ["", Validators.required],
            date: ["", Validators.required],
            title: [""],
        });
        
        this.userInputConfig = {
            label: "Usuário",
            controlName: "user",
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
        this.subitModalConfig = {
            label: "Adicionar Pagamento",
            primary: true
        }
    }

    cancelModal() {
        this.payModalService.close(this.modalId);
    }

    submitModal() {
        // TODO adicionar tarefa
    }

}