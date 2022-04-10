import { Component, OnInit, ViewChild, AfterViewInit, QueryList } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { TasksDataSource } from './task.datasource';
import { Subject, merge } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';
import { TaskService } from 'src/core/services/task/task.service';
import * as moment from 'moment';
import { DialogAddTaskComponent } from 'src/components/dialogs/dialog-add-task/dialog-add-task.component';
import { DialogRemoveTaskComponent } from 'src/components/dialogs/dialog-remove-task/dialog-remove-task.component';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  totalItems = 0;
  searchSubject = new Subject();
  itemsPerPageList: Array<number> = [5, 10, 25, 50];
  itemsPerPage = 5;
  currentPage = 1;
  searchForm: FormGroup;


  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.searchForm = this.formBuilder.group({
      search: [''],
    });

    this.searchSubject.pipe(debounceTime(500))
      .subscribe((val: string) => {
        this.load(val);
      });

    this.dataSource = new TasksDataSource(this.taskService);
    this.dataSource.load(null, null, null, null, null, null, 'asc', 1, 10);

  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.currentPage = 1);

    if (this.dataSource && this.dataSource.totalElements$) {
      this.dataSource.totalElements$.subscribe(value => {
        this.totalItems = value;
      });
    }

    merge(this.sort.sortChange, this.currentPage)
      .pipe(
        tap(() => this.load(this.searchForm.value && this.searchForm.value.search.length > 0 ? this.searchForm.value.search : ''))
      )
      .subscribe();
  }

  convertDate(date: string, format: string) {
    return moment(date).format(format);
  }

  load(filter?: string) {
    this.dataSource.load(filter, null, null, null, null, this.sort.active, this.sort.direction, this.currentPage, this.itemsPerPage);
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

        if (response.data.confirm) {
          this.load();
        }

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
        if (response.data.confirm) {
          this.load();
        }
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

        if (response.data.confirm) {
          this.load();
        }

        subject.next(response.data.confirm);
        subject.complete();
      });

  }

  searchOnChange(event) {
    this.searchSubject.next(event.target.value);
  }

  pageChanged(event: PageChangedEvent): void {
    this.currentPage = event.page;
    this.load(this.searchForm.value && this.searchForm.value.search.length > 0 ? this.searchForm.value.search : '');
  }

  itemPerPageOnSelected(event) {
    this.itemsPerPage = event.value;
    this.load(this.searchForm.value && this.searchForm.value.search.length > 0 ? this.searchForm.value.search : '');
  }

}
