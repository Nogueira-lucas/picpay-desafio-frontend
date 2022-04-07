import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/core/services/task/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //title: string;

  constructor(
    //private taskService: TaskService
  ) {

  }

  ngOnInit() {
    //this.title = 'Desafio Picpay Front-end';
   // this.getAllTasks()
  }

  /*getAllTasks() {

    console.log("GET ALL TASKS");
    this.taskService.getAll().subscribe(tasks => {
      console.log("tasks:",tasks)
     }, error => {
      console.log("tasks:error:",error)
    })

    this.taskService.getById(11).subscribe(tasks => {
      console.log("tasks By ID:",tasks)
     }, error => {
      console.log("tasks:error:",error)
    })

  }*/
}
