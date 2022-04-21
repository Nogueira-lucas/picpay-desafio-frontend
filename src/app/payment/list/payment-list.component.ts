import { Component, OnInit } from '@angular/core';
import { PaymentParams } from 'src/app/_models/listRequest';
import { Payment } from 'src/app/_models/payment';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
    selector: 'payment-list',
    templateUrl: 'payment-list.component.html',
    styleUrls: ['payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {

    paymentList: Payment[];
    params: PaymentParams;

    selectedLimit = 20;
    limitOptions: [5, 10, 15, 20, 25];

    activePage = 1;

    constructor(private paymentService: PaymentService) { }

    ngOnInit(): void {

        this.params = {
            page: this.activePage,
            limit: this.selectedLimit
        }
        this.paymentService.getAllPaginated(this.params).subscribe(paymentList => {
            this.paymentList = paymentList;
        })
    }
}