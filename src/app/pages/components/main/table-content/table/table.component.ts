import { TasksService } from './../../../../../../core/services/tasks.service';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['usuario', 'titulo', 'data', 'valor', 'pago', 'acoes'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  data: any[] = [];
  dataConst: any[] = [];
  dataSource = new MatTableDataSource<Element>(this.data);
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private _httpClient: HttpClient,
    private _tasksService: TasksService
  ) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this._tasksService.getTasks().subscribe(
      (data: any[]) => {
        this.data = data;
        this.dataConst = data;
        this.dataSource.data = this.data;
        this.isLoadingResults = false;
        this.resultsLength = data.length;
      }
    )
  }

  ngAfterViewInit() {
  }

  searchUser(){
    this.isLoadingResults = true;
    this.dataSource.data = this.data.filter(item => item.username.includes(this.searchTerm));
    this.resultsLength = this.dataSource.data.length;
    this.isLoadingResults = false;
  }
}
