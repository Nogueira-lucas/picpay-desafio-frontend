import { Component, OnInit, ViewChild, Injector, AfterViewInit, QueryList } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { TasksDataSource } from './task.datasource';
import { Subject, merge } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators'
import { TaskService } from 'src/core/services/task/task.service';
import { Router } from "@angular/router"
import * as moment from 'moment';
moment.locale('pt-br');

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, AfterViewInit {

  @ViewChild('checkBox') checkBox: QueryList<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort


  displayedColumns = ['name', 'title', 'date', 'value', 'isPayed', 'actions'];
  dataSource: TasksDataSource
  resultLength: number = 0
  searchSubject = new Subject();


  constructor(
    private taskService: TaskService,
    private router: Router
  ) {
    if (!sessionStorage.getItem('access_token') || sessionStorage.getItem('access_token') && sessionStorage.getItem('access_token') !== "oiqwue37767432&%HWEQW") {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {

    this.searchSubject.pipe(debounceTime(500))
      .subscribe((val: string) => {
        this.load(val)
      })

    this.dataSource = new TasksDataSource(this.taskService)
    this.dataSource.load(null, null, null, null, null, null, 'asc', 1, 10)

  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 1)

    if (this.dataSource && this.dataSource.totalElements$) {
      this.dataSource.totalElements$.subscribe(value => {
        this.resultLength = value
      })
    }

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.load())
      )
      .subscribe()
  }

  convertDate(date: string, format: string) {
    return moment(date).format(format)
  }

  load(filter?: string) {
    this.dataSource.load(filter, null, null, null, null, null, 'asc', this.paginator.pageIndex + 1, this.paginator.pageSize)
  }

}
