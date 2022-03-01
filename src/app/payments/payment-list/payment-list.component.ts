import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PaymentsService } from '../payments.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  payments = null;

  constructor(private paymentsService: PaymentsService) { }

  ngOnInit(): void {
    this.getPayments();
  }

  private getPayments(): void{
    console.log('entrou')
    this.paymentsService.list().subscribe(result => {
      this.payments = result;
    });
  }


}
