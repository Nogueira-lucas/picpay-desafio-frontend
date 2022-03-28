import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { Payment } from 'src/app/models/payment';
import { PaymentsService } from 'src/app/services/payments.service';
import { AlertComponent } from '../alert/alert.component';
import { Alert } from 'src/app/models/alert';

@Component({
  selector: 'app-delete-payment',
  templateUrl: './delete-payment.component.html',
  styleUrls: ['./delete-payment.component.scss']
})
export class DeletePaymentComponent implements OnInit {

  @Input()
  public payment: Payment

  constructor(private modalService: NgbModal,
    private paymentService: PaymentsService) { }

  ngOnInit(): void {
  }

  deletePayment(payment: Payment) {
    const id = payment.id
    this.paymentService.deleteTask(id).subscribe(response => {
    },
      error => {
        console.log(error)
      })

  }
  closeModal() {
    this.modalService.dismissAll()
  }
}
