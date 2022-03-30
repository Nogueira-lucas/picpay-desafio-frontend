import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@core/notification.service';
import { TaskService } from '@core/task.service';
import { TaskModel } from '@models/task.model';
import { take } from 'rxjs/operators';
import { TaskDeleteConfirmModalComponent } from '../task-delete-confirm-modal/task-delete-confirm-modal.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'pf-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss']
})
export class TasksTableComponent implements OnInit {

  tasks: Array<TaskModel> = [];
  displayedColumns: string[] = ['username', 'title', 'date', 'value', 'isPayed', 'action'];
  dataSource = new MatTableDataSource<TaskModel>(this.tasks);
  searchInput = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _taskService: TaskService,
    private _notificationService: NotificationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllTasks();
    this._taskService.refreshGetAll.subscribe(_ => this.getAllTasks());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllTasks = () => {
    this._taskService.getAllTasks()
      .pipe(take(1))
      .subscribe(tasks => {
        this.tasks = tasks;
        this.setTasksData(tasks);
      });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Ordenação ${sortState.direction} finalizada`);
    } else {
      this._liveAnnouncer.announce('Ordenação concluída');
    }
  }

  openEditModal(task: TaskModel) {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '50%',
      data: { ...task },
    });

    dialogRef.afterClosed().subscribe(_ => this._taskService.triggerGetAll());
  }

  openDeleteConfirmModal(task: TaskModel) {
    const dialogRef = this.dialog.open(TaskDeleteConfirmModalComponent, {
      width: '30%',
      data: { ...task },
    });

    dialogRef.afterClosed().subscribe(_ => this._taskService.triggerGetAll());
  }

  pay(task: TaskModel) {
    this._taskService.updateTask({ ...task, isPayed: !task.isPayed })
      .pipe(take(1))
      .subscribe(_ => {
        if (task.isPayed)
          this._notificationService.open('Pagamento marcado como pago.');
        else
          this._notificationService.open('Pagamento desmarcado como pago.');
      }, _ => this._notificationService.open('Ocorreu um erro ao tentar marcar esse pagamento como pago.'),
        () => this._taskService.triggerGetAll());
  }

  searchUsername(event: string) {
    const tasks = this.tasks.filter(t => t.username.includes(event));
    this.setTasksData(tasks);
  }

  setTasksData(tasks: Array<TaskModel>) {
    this.dataSource = new MatTableDataSource<TaskModel>(tasks)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}