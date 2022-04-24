import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { JsonServerParams } from 'src/app/_models/json-server-params';
import { Payment } from 'src/app/_models/payment';
import { PaymentService } from 'src/app/_services/payment.service';
import { PaymentAddComponent } from '../add/payment-add.component';
import { PaymentDeleteComponent } from '../delete/payment-delete.component';
import { PaymentEditComponent } from '../edit/payment-edit.component';
import { faAngleLeft, faAngleRight, faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'payment-list',
    templateUrl: 'payment-list.component.html',
    styleUrls: ['payment-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PaymentListComponent implements OnInit {

    @ViewChild("editPayment", { read: ViewContainerRef }) editModalComponent: ViewContainerRef;
    @ViewChild("deletePayment", { read: ViewContainerRef }) deleteModalComponent: ViewContainerRef;


    faTrashCan = faTrashCan;
    faPencil = faPencil;

    params: JsonServerParams;

    paymentList: Payment[];
    totalCount: number;
    paginationLink: any;

    search = "";

    selectedLimit = 5;
    limitOptions: [5, 10, 15, 20];

    currentPage = 1;
    pagesAmount = [1];


    constructor(
        private paymentService: PaymentService,
        private componentFactory: ComponentFactoryResolver
    ) { }

    ngOnInit(): void {
        this.loadTable();
        }


    pageChange($event) {
        this.currentPage = $event;
        this.loadTable()
    }

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
            page: this.currentPage,
            limit: this.selectedLimit
        }

        this.paymentService.getAllPaginated(this.params).subscribe(response => {
            this.paymentList = response.items;
            this.totalCount = response.totalCount;
            this.paginationLink = response.link;

            let pagesAmount = (this.totalCount / this.selectedLimit).toFixed();
            this.pagesAmount = new Array(parseInt(pagesAmount, 10));
        });
    }

}