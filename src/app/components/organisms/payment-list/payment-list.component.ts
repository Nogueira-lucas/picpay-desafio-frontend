import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent {

  selectList = ['5', '10', '20']


  @Input()
  dataSource


  ngOnInit(): void {
  }

  onSelected(value){
    console.log('value: ', value);
  }

}
