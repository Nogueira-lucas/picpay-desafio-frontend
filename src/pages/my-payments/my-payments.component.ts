import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { TaskService } from 'src/services/task.service'
import { AuthService } from 'src/services/auth.service'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatDialog } from '@angular/material/dialog'
import { ManagePaymentModalComponent } from 'src/components/manage-payment-modal/manage-payment-modal.component'
import { DateAdapter} from '@angular/material/core'
import * as moment from 'moment'
import Task from 'src/models/task.model'

@Component({
  selector: 'app-my-payments',
  templateUrl: './my-payments.component.html',
  styleUrls: ['./my-payments.component.scss'],
  
})
export class MyPaymentsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort;

  isLoading: boolean = true
  isTaskCreate: boolean = false
  isTaskEdit: boolean = false
  isTaskRemove: boolean = false
  filterOptions: any = {}
  tasks: Task[] = []
  displayedColumns: string[] = ['name', 'title', 'date', 'value', 'isPayed', 'actions']
  taskDataSource: any = new MatTableDataSource(this.tasks)  
  errorTaskData: boolean = false
  
  constructor(
    private taskService: TaskService,
    private adapter: DateAdapter<any>,
    public dialog: MatDialog,
  ) { 
    this.adapter.setLocale('pt-br');
  }
  
  ngOnInit(): void {
    this.filterOptions = { name: "Usuario", value: null }
    //this.listTasksWithPagination()
    this.listTasks()
  }

  listTasks(){
    this.isLoading = true
    this.taskDataSource = []
    this.taskService.listAllTasks().subscribe((response: Task[]) => {
      this.taskDataSource = new MatTableDataSource(response)
      this.taskDataSource.paginator = this.paginator
      this.taskDataSource.sort = this.sort;
      this.taskDataSource.sortingDataAccessor = (data: Task, header: string) => data[header];
      this.errorTaskData = false
      this.isLoading = false
    }, error => {
      console.log(error)
      this.errorTaskData = true
    })
  }

  listTasksWithPagination(event?: any){
    this.isLoading = true
    let params = {}
    if(!event){
      params = {
        "page": 1,
        "limit": 5
      }
    } else {
      params = {
        "page": event.pageIndex,
        "limit": event.pageSize
      }
    }
    this.taskService.listTasksWithPagination(params).subscribe((response: Task[]) => {
      this.taskDataSource = new MatTableDataSource(response)
      this.taskDataSource.paginator = this.paginator
      this.errorTaskData = false
      this.isLoading = false
    }, error => {
      console.log(error.message)
      this.errorTaskData = true
    })
  }

  openAddEditModal(task?: Task){
    if(task != null){
      this.isTaskEdit = true
    } else {
      this.isTaskCreate = true
    }

    const dialogRef = this.dialog.open(ManagePaymentModalComponent, {
      width: '550px',
      maxWidth: '100%', 
      data: { 
        title: this.isTaskCreate? "Adicionar Pagamento": "Editar Pagamento",        
        isTaskEdit: this.isTaskEdit,
        isTaskCreate: this.isTaskCreate,
        ...(this.isTaskEdit && {taskToBeEditted: task}),
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        if(this.isTaskCreate){          
          this.createTask(result.task)  
        } else if(this.isTaskEdit){
          this.updateTask(result.taskId, result.task)
        }
      }
      this.isTaskCreate = false
      this.isTaskEdit = false
    })
  }

  openRemoveTaskModal(task: Task){
    const dialogRef = this.dialog.open(ManagePaymentModalComponent, {
      width: '400px',
      maxWidth: '100%', 
      data: { 
        title: "Excluir Pagamento",
        isTaskRemove: true,
        taskToBeRemoved: task,
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        this.deleteTask(task.id)
      }
    })
  }


  createTask(newTask: Task){
    this.isLoading = true
    this.taskService.createTask(newTask).subscribe(response => {
      console.log(response)
      this.listTasks()      
      this.isLoading = false
    }, error => {
      this.isLoading = false
      console.log(error.message)
    })
  }

  updateTask(taskId: number, updatedTask: Task){
    this.isLoading = true
    this.taskService.updateTask(taskId, updatedTask).subscribe(response => {
      this.listTasks()      
      this.isLoading = false
    }, error => {
      this.isLoading = false
      console.log(error.message)
    })
  }

  deleteTask(taskId: number){
    this.taskService.deleteTask(taskId).subscribe(response => {
      this.listTasks()
    }, error => {
      console.log(error.message)
    })
  }

  search(event){
    
  }
  
  
  onPaginateChange(event) {
    this.listTasksWithPagination()
    /* if (pageIndex !== event.pageIndex) {
      console.log(event.pageIndex)
      pageIndex = event.pageIndex
    } */
  }
}



