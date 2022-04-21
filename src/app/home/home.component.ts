import { Component, OnInit } from '@angular/core';
import { ButtonConfig } from '../_components/button/ButtonConfig';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

    addButtonConfig: ButtonConfig;

    constructor() { }

    ngOnInit() {
        this.addButtonConfig = {
            label: "Adicionar Pagamento",
            primary: true
        }
    }

    addTask() {
        // TODO abertura de modal: adicionar tarefa
    }
}