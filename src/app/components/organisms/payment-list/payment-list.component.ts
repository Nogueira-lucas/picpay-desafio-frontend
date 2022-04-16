import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent {

  selectList = ['5', '10', '20']

  infoPayment = {}


  @Input()
  dataSource

  @Input()
  limit: number

  @Output() callback = new EventEmitter<any>();


  ngOnInit(): void {
  }

  onSelected(value){
    this.infoPayment = {...this.infoPayment, limit: value}
    !!this.callback && this.callback.emit(this.infoPayment)
  }
  
  onPagination(value){
    this.infoPayment = {...this.infoPayment, offset: value}
    !!this.callback && this.callback.emit(this.infoPayment)
  }

}
