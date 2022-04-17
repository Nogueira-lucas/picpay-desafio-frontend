import { Component, OnInit, ViewChild } from '@angular/core';
import Task from 'src/models/task.model';
import { TaskService } from 'src/services/task.service';
import * as moment from 'moment';
import { AuthService } from 'src/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-my-payments',
  templateUrl: './my-payments.component.html',
  styleUrls: ['./my-payments.component.scss']
})
export class MyPaymentsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  isLoading: boolean = true;
  displayedColumns: string[] = ['user', 'title', 'date', 'value', 'isPayed', 'actions'];
  taskDataSource: any = new MatTableDataSource([])  
  errorTaskData: boolean = false;

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.listTasksWithPagination()
  }

  listTasks(){
    this.isLoading = true;
    this.taskDataSource = []
    this.taskService.listAllTasks().subscribe((response: Task[]) => {
      console.log(response)
      this.taskDataSource = new MatTableDataSource(response)
      this.taskDataSource.paginator = this.paginator
      this.taskDataSource.sort = this.sort
      this.errorTaskData = false
      
      this.isLoading = false
    }, error => {
      console.log(error)
      this.errorTaskData = true;
    })
  }

  listTasksWithPagination(){
    const params = {
      "page": 2,
      "limit": 5
    }
    
    this.taskService.listTasksWithPagination(params).subscribe((response: Task[]) => {
      console.log(response)
      this.taskDataSource = new MatTableDataSource(response)
      this.taskDataSource.paginator = this.paginator
      this.taskDataSource.sort = this.sort
      this.errorTaskData = false
      this.isLoading = false
    }, error => {
      console.log(error.message)
      this.errorTaskData = true;
    })
  }

  createTask(){
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

  updateTask(element: any){

  }

  deleteTask(taskId: number){ // Plus: automatically delete task, after the checkbox is set to true

  }

  logout(){
    this.authService.logout()
  }

  search(event){

  }
}



