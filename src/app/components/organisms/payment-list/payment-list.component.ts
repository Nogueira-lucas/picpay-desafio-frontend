import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent {

  selectList = ['5', '10', '20']

  infoPayment = {}

  inputValue: object = {}


  @Input()
  dataSource
  
  @Input()
  limit: number
  
  @Output() callback = new EventEmitter<any>();
  
  
  ngOnInit(): void {
    console.log('dataSource: ', this.dataSource);
  }

  onSelected(value){
    this.infoPayment = {...this.infoPayment, limit: value}
    !!this.callback && this.callback.emit(this.infoPayment)
  }
  
  onPagination(value){
    this.infoPayment = {...this.infoPayment, offset: value}
    !!this.callback && this.callback.emit(this.infoPayment)
  }

  onChange(value){
    this.inputValue = {...this.inputValue, ...value}
  }

  onSubmit(event){
    event.preventDefault()
    this.callback.emit(this.inputValue)
  }

}