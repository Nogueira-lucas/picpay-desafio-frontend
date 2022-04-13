import { Component, OnInit } from '@angular/core';
import PaymentTask from 'src/models/payment-task.model';
import { TaskService } from 'src/services/task.service';
import * as moment from 'moment';


@Component({
  selector: 'app-my-payments',
  templateUrl: './my-payments.component.html',
  styleUrls: ['./my-payments.component.scss']
})
export class MyPaymentsComponent implements OnInit {

  constructor(
    private taskService:TaskService
  ) { }

  ngOnInit(): void {
    this.listTasksWithPagination()
  }

  listTasks(){
    this.taskService.listAllTasks().subscribe((response: PaymentTask[]) => {
      console.log(response)
    })
  }

  listTasksWithPagination(){
    const params = {
      "page": 2,
      "limit": 5
    }
    
    this.taskService.listTasksWithPagination(params).subscribe((response: PaymentTask[]) => {
      console.log(response)
    }, error => {
      console.log(error.message)
    })
  }

  createTask(){
    // check if the user already exists in the table?
    let newPaymentTask: PaymentTask = {
      username: "mheartu",
      value: 47.33,
      date: new Date()
    }

    this.taskService.createTask(newPaymentTask).subscribe(response => {
      console.log(response)
    }, error => {
      console.log(error.message)
    })
  }

  updateTask(){

  }

  deleteTask(){ // Plus: automatically delete task, after the checkbox is set to true

  }

}