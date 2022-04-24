import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ButtonConfig } from '../_components/button/button-config';
import { PaymentAddComponent } from './add/payment-add.component';

@Component({
    selector: 'payments',
    templateUrl: 'payment.component.html',
    styleUrls: ['payment.component.scss']
})
export class PaymentComponent implements OnInit {

    @ViewChild('addPayment', { read: ViewContainerRef }) addModalComponent: ViewContainerRef;

    addButtonConfig: ButtonConfig;

    constructor(private componentFactory: ComponentFactoryResolver) { }

    ngOnInit(): void {
        this.addButtonConfig = {
            label: 'Adicionar Pagamento',
            type: 'primary'
        }
    }

    openAddModal(): void {
        const addFactory = this.componentFactory.resolveComponentFactory(PaymentAddComponent)
        this.addModalComponent.createComponent(addFactory)
    }

}