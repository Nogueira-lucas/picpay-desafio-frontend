import { AddPaymentService } from './../add-payment.service';
import { Payment } from './../payment.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-payments',
  templateUrl: './list-payments.component.html',
  styleUrls: ['./list-payments.component.scss']
})
export class ListPaymentsComponent implements OnInit {

  payments: Payment[]
  
  constructor(private addPaymentService: AddPaymentService) { }

  ngOnInit(): void {
    this.addPaymentService.read().subscribe(payments => {
      this.payments = payments;
      console.log(payments);
    })
  }

}
