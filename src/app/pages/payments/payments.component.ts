import { NgbModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/payment';
import { PaymentsService } from 'src/app/services/payments.service';
import { DeletePaymentComponent } from 'src/app/components/delete-payment/delete-payment.component';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  payments: Payment[] = []
  displayedColumns: string[] = ['name'];
  dataSource: Payment[] = []

  page = 1;
  pageSize = 5;
  collectionSize = this.payments.length;
  filteredPayments: Payment[];

  constructor(
    private paymentService: PaymentsService,
    private modalService: NgbModal,) { }

  ngOnInit() {
    
    this.paymentService.listAllTasks().subscribe(response => {
      this.payments = response
      this.filteredPayments = this.payments
      this.dataSource = this.payments
      this.refreshPayments()
    });
    
  }

  openModal(payment) {
    const modal = this.modalService.open(DeletePaymentComponent)
    modal.componentInstance.payment = payment
  }

  refreshPayments() {
    this.filteredPayments = this.payments
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
