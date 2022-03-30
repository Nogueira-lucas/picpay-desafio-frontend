import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../models/task';

@Component({
  selector: 'app-delete-payment',
  templateUrl: './delete-payment.component.html',
  styleUrls: ['./delete-payment.component.scss']
})
export class DeletePaymentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Task) { }

  ngOnInit(): void {
  }

}
