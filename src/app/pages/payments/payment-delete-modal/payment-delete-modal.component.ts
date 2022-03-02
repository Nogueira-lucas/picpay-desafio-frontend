import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { Payment } from 'src/app/interfaces/payment.interface';

@Component({
  selector: 'app-payment-delete-modal',
  templateUrl: './payment-delete-modal.component.html',
  styleUrls: ['./payment-delete-modal.component.scss']
})
export class PaymentDeleteModalComponent implements OnInit {
  @Input() payment!: Payment;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

}
