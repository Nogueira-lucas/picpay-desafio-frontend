import { Component, OnInit } from '@angular/core';
import Task from 'src/models/task.model';
import { TaskService } from 'src/services/task.service';
import * as moment from 'moment';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-my-payments',
  templateUrl: './my-payments.component.html',
  styleUrls: ['./my-payments.component.scss']
})
export class MyPaymentsComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.listTasksWithPagination()
  }

  listTasks(){
    this.taskService.listAllTasks().subscribe((response: Task[]) => {
      console.log(response)
    })
  }

  listTasksWithPagination(){
    const params = {
      "page": 2,
      "limit": 5
    }
    
    this.taskService.listTasksWithPagination(params).subscribe((response: Task[]) => {
      console.log(response)
    }, error => {
      console.log(error.message)
    })
  }

  createTask(){
    // check if the user already exists in the table?
    let newTask: Task = {
      username: "mheartu",
      value: 47.33,
      date: new Date()
    }

    this.taskService.createTask(newTask).subscribe(response => {
      console.log(response)
    }, error => {
      console.log(error.message)
    })
  }

  updateTask(){

  }

  deleteTask(){ // Plus: automatically delete task, after the checkbox is set to true

  }

  logout(){
    this.authService.logout()
  }

}