import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TaskService } from './services/task/task.service';
import { ITask, TaskAction, TaskContract } from './interfaces/task.interface';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeleteTaskComponent } from './components/delete-task/delete-task.component';
import { Subscription } from 'rxjs';

const COMPONENTS_SCHEMA = {
  delete: { component: DeleteTaskComponent, width: '25vw' },
  edit: { component: EditTaskComponent, width: '50vw' },
  add: { component: EditTaskComponent, width: '50vw' },
};

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'title', 'date', 'value', 'isPayed', 'actions'];
  tasksSource = new MatTableDataSource([]);
  private subscription: Subscription;
  messageError = true;

  constructor(private readonly taskService: TaskService, private readonly dialog: MatDialog, private readonly toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadTasks();
    this.subscription = this.taskService.taskState$.subscribe(action => this.handleTaskActions(action))
  }

  ngOnDestroy() {
    if(this.subscription) 
      this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.tasksSource.sort = this.sort;
    this.tasksSource.paginator = this.paginator;
    this.tasksSource.paginator.page.pipe(tap((res) => this.loadTasks(res.pageIndex + 1, res.pageSize))).subscribe();
  }

  loadTasks(pageIndex = 0, pageSize = null) {
    this.taskService.getTasks(pageIndex,
      pageSize).subscribe(response => {
        this.messageError = response ? false : true;
        this.tasksSource = new MatTableDataSource(response);
        this.tasksSource.sort = this.sort;
        if (!pageSize) this.tasksSource.paginator = this.paginator;
      }, _=> {
        this.messageError = true;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.tasksSource.filterPredicate = (data: ITask, filter: string) => data.name.concat(data.username).trim().toLowerCase().indexOf(filter) != -1;
    this.tasksSource.filter = filterValue.trim().toLowerCase();
  }

  onChangeCheckbox(event: MatCheckboxChange, task: ITask) {
    task.isPayed = event.checked;
    this.taskService.updateTask(task.id, task).subscribe(_ => this.toastr.success('Status de pagamento alterado com êxito.', 'Deu tudo certo!'));
  }

  openDialog(name: string, task: ITask) {
    this.dialog.open(COMPONENTS_SCHEMA[name].component, { width: COMPONENTS_SCHEMA[name].width, data: { source: task, type: name} });
  }

  private handleTaskActions(event: TaskContract) {
    if(event) {
      switch (event.action) {
        case TaskAction.GET_TASKS:
          this.loadTasks(this.tasksSource.paginator.pageIndex);
          break;
      
        default:
          break;
      }
    }
  }
}
