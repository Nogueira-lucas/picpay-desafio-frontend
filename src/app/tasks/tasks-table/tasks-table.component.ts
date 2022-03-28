import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, InjectionToken, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorDefaultOptions } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '@core/task.service';
import { TaskModel } from '@models/task.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'pf-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss']
})
export class TasksTableComponent implements OnInit {

  tasks: Array<TaskModel> = [];
  displayedColumns: string[] = ['username', 'title', 'date', 'value', 'isPayed', 'action'];
  dataSource = new MatTableDataSource<TaskModel>(this.tasks);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _taskService: TaskService
  ) { }

  ngOnInit(): void {
    this._taskService.getAllTasks()
      .pipe(take(1))
      .subscribe(tasks => {
        this.dataSource = new MatTableDataSource<TaskModel>(tasks)
        this.dataSource.paginator = this.paginator;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Ordenação ${sortState.direction} finalizada`);
    } else {
      this._liveAnnouncer.announce('Ordenação concluída');
    }
  }

  openEditModal(task: TaskModel) {
    console.log('openEditModal', task);
  }

  openDeleteConfirmModal(task: TaskModel) {
    console.log('openDeleteConfirmModal', task);
  }

  pay(task: TaskModel) {
    console.log('pay', task);
  }
}