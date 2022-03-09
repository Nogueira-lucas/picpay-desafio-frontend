import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TaskService } from './../../shared/services/task/task.service';
import { ITask } from '../../shared/interfaces/task.interface';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'title', 'date', 'value', 'isPayed', 'actions'];
  tasksSource = new MatTableDataSource([]);

  constructor(private readonly taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  ngAfterViewInit() {
    this.tasksSource.sort = this.sort;
    this.tasksSource.paginator = this.paginator;
    this.tasksSource.paginator.page.pipe(tap((res) => this.loadTasks(res.pageIndex + 1, res.pageSize))).subscribe();
  }

  loadTasks(pageIndex = 0, pageSize = null) {
    this.taskService.getTasks(pageIndex,
      pageSize).subscribe(response => {
        this.tasksSource = new MatTableDataSource(response);
        this.tasksSource.sort = this.sort;
        if (!pageSize) this.tasksSource.paginator = this.paginator;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.tasksSource.filterPredicate = (data: ITask, filter: string) => data.name.concat(data.username).trim().toLowerCase().indexOf(filter) != -1;
    this.tasksSource.filter = filterValue.trim().toLowerCase();
  }

  onChangeCheckbox(event: MatCheckboxChange, task: ITask) {
    task.isPayed = event.checked;
  }
}
