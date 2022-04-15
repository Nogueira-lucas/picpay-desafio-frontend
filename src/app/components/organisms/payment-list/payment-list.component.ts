import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent {

  selectList = ['5', '10', '20']


  @Input()
  dataSource

  @Input()
  limit: number

  @Output() callback = new EventEmitter<any>();


  ngOnInit(): void {
  }

  onSelected(value){
    !!this.callback && this.callback.emit(value)
  }

}
