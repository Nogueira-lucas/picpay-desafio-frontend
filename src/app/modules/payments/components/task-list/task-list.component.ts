import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PaymentsService } from '../../../../services/payments.service';
import { Task } from '../../models/task';

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
})
export class TaskListComponent implements OnInit {
  public tasks$: Observable<Task[]>;

  public displayedColumns = ["username", "title", "date", "value", "isPayed"];

  constructor(private paymentService: PaymentsService) {
    this.tasks$ = paymentService.getTasks()
  }

  ngOnInit(): void {


  }
}
