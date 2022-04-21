import { Component, OnInit } from '@angular/core';
import { ButtonConfig } from '../_components/button/ButtonConfig';
import { PayModalService } from '../_components/modal/pay-modal.service';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

    addButtonConfig: ButtonConfig;

    constructor(private payModalService: PayModalService) { }

    ngOnInit() {
        this.addButtonConfig = {
            label: "Adicionar Pagamento",
            primary: true
        }
    }

    openModal(modalId) {
        this.payModalService.open(modalId);
    }
}