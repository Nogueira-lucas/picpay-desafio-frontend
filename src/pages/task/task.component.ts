import { Component, OnInit, ViewChild, AfterViewInit, QueryList } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { TasksDataSource } from './task.datasource';
import { Subject, merge } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';
import { TaskService } from 'src/core/services/task/task.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DialogAddTaskComponent } from 'src/components/dialogs/dialog-add-task/dialog-add-task.component';
import { DialogRemoveTaskComponent } from 'src/components/dialogs/dialog-remove-task/dialog-remove-task.component';

moment.locale('pt-br');

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, AfterViewInit {

  @ViewChild('checkBox') checkBox: QueryList<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  displayedColumns = ['name', 'title', 'date', 'value', 'isPayed', 'actions'];
  dataSource: TasksDataSource;
  resultLength = 0;
  searchSubject = new Subject();


  constructor(
    private taskService: TaskService,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
    if (!sessionStorage.getItem('access_token') || sessionStorage.getItem('access_token') && sessionStorage.getItem('access_token') !== 'oiqwue37767432&%HWEQW') {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {

    this.searchSubject.pipe(debounceTime(500))
      .subscribe((val: string) => {
        this.load(val);
      });

    this.dataSource = new TasksDataSource(this.taskService);
    this.dataSource.load(null, null, null, null, null, null, 'asc', 1, 10);

  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 1);

    if (this.dataSource && this.dataSource.totalElements$) {
      this.dataSource.totalElements$.subscribe(value => {
        this.resultLength = value;
      });
    }

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.load())
      )
      .subscribe();
  }

  convertDate(date: string, format: string) {
    return moment(date).format(format);
  }

  load(filter?: string) {
    this.dataSource.load(filter, null, null, null, null, null, 'asc', this.paginator.pageIndex + 1, this.paginator.pageSize);
  }

  addTask() {

    const subject = new Subject<boolean>();

    this.dialog.open(DialogAddTaskComponent, {
      panelClass: 'event-form-dialog',
      disableClose: true,
      width: '772px',
      height: '395px',
      data: null
    }).afterClosed()
      .subscribe(response => {
        this.load();
        subject.next(response.data.confirm);
        subject.complete();
      });

  }

  updateTask(task: Task) {

    const subject = new Subject<boolean>();

    this.dialog.open(DialogAddTaskComponent, {
      panelClass: 'event-form-dialog',
      disableClose: true,
      width: '772px',
      height: '395px',
      data: task
    }).afterClosed()
      .subscribe(response => {
        this.load();
        subject.next(response.data.confirm);
        subject.complete();
      });

  }

  deleteTask(task: Task) {

    const subject = new Subject<boolean>();

    this.dialog.open(DialogRemoveTaskComponent, {
      panelClass: 'event-form-dialog',
      disableClose: true,
      width: '405px',
      height: '325px',
      data: task
    }).afterClosed()
      .subscribe(response => {
        this.load();
        subject.next(response.data.confirm);
        subject.complete();
      });

  }

}
