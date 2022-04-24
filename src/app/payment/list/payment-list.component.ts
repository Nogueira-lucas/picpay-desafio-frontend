import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { JsonServerParams } from 'src/app/_models/json-server-params';
import { Payment } from 'src/app/_models/payment';
import { PaymentService } from 'src/app/_services/payment.service';
import { PaymentDeleteComponent } from '../delete/payment-delete.component';
import { PaymentEditComponent } from '../edit/payment-edit.component';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';
import { ButtonConfig } from 'src/app/_components/button/button-config';

@Component({
    selector: 'payment-list',
    templateUrl: 'payment-list.component.html',
    styleUrls: ['payment-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PaymentListComponent implements OnInit {

    @ViewChild('editPayment', { read: ViewContainerRef }) editModalComponent: ViewContainerRef;
    @ViewChild('deletePayment', { read: ViewContainerRef }) deleteModalComponent: ViewContainerRef;

    faTrashCan = faTrashCan;
    faPencil = faPencil;

    params: JsonServerParams;

    paymentList: Payment[];
    totalCount: number;
    paginationLink: any;

    search = '';

    limitOptionsConfig = {
        placeholder: 'Selecione'
    };

    limitOptions = [
        { id: 1, description: '5 registros', value: 5 },
        { id: 2, description: '10 registros', value: 10 },
        { id: 3, description: '15 registros', value: 15 },
        { id: 4, description: '20 registros', value: 20 }
    ];

    selectedLimit = this.limitOptions[0];

    currentPage = 1;
    pagesAmount = [1];

    filterButton: ButtonConfig;

    columns = [
        { name: 'user', label: 'Usuário', width: '20%', sortable: 'sortable' },
        { name: 'value', label: 'Valor', width: '10%', sortable: 'sortable' },
        { name: 'isPayed', label: 'Situação', width: '10%' },
        { name: 'date', label: 'Data', width: '10%', sortable: 'sortable' },
        { name: 'title', label: 'Título', width: '40%', sortable: 'sortable' }
    ]

    constructor(
        private paymentService: PaymentService,
        private componentFactory: ComponentFactoryResolver
    ) { }

    ngOnInit(): void {
        this.loadTable();

        this.filterButton = {
            label: 'Filtros'
        }
    }

    changeQuickSearch($event) {
        this.search = $event;
        this.currentPage = 1;
        this.loadTable();
    }

    limitChange($event) {
        this.selectedLimit = $event;
        this.loadTable();
    }

    pageChange($event) {
        this.currentPage = $event;
        this.loadTable()
    }

    sortColumn($event) {

    }

    openEditModal(payment) {
        const editFactory = this.componentFactory.resolveComponentFactory(PaymentEditComponent)
        const componentRef = this.editModalComponent.createComponent(editFactory)
        componentRef.instance.payment = payment;
    }

    openDeleteModal(payment) {
        const deleteFactory = this.componentFactory.resolveComponentFactory(PaymentDeleteComponent)
        const componentRef = this.deleteModalComponent.createComponent(deleteFactory)
        componentRef.instance.payment = payment;
    }

    private loadTable() {
        this.params = {
            user: this.search,
            page: this.currentPage,
            limit: this.selectedLimit.value
        }

        this.paymentService.getAllPaginated(this.params).subscribe(response => {
            this.paymentList = response.items;
            this.totalCount = response.totalCount;
            this.paginationLink = response.link;

            let pagesAmount = (this.totalCount / this.selectedLimit.value).toFixed();
            this.pagesAmount = new Array(parseInt(pagesAmount, 10));
        });
    }

}