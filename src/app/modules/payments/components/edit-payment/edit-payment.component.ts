import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../models/task';

@Component({
  selector: 'app-edit-payment',
  templateUrl: './edit-payment.component.html',
  styleUrls: ['./edit-payment.component.scss']
})
export class EditPaymentComponent implements OnInit {

  public date:string = ''

  constructor(@Inject(MAT_DIALOG_DATA) public data: Task) {
   this.date = new Date(data.date).toLocaleDateString();
  }

  ngOnInit(): void {
  }

}
