import { TableService } from 'src/core/services/table.service';
import { ModalComponent } from './../../../../../componentes/modal/modal.component';
import { TasksService } from './../../../../../../core/services/tasks.service';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

@UntilDestroy()
export class TableComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['name', 'title', 'date', 'value', 'paid', 'acoes'];

  resultsLength = 0;
  isLoadingResults = true;
  data: any = [];
  dataSource = new MatTableDataSource(this.data);
  dataConst: any[] = [];
  searchTerm: string = '';
  dialogRef!: MatDialogRef<ModalComponent>;
  qtdItens: number = 10;
  noMoreResults: boolean = false;
  isRateLimitReached = false;

  @Input() isMobile: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _tableService: TableService,
    private _tasksService: TasksService,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    public currencyPipe: CurrencyPipe,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this.getTasks();
    this._tableService.getTasks();
    this.receiveResultsLength();
    this.receiveDataSources();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  receiveResultsLength() {
    this._tableService.resultsLengthChanged.pipe(untilDestroyed(this)).subscribe(
      (resultsLength: number) => {
        this.resultsLength = resultsLength;
        this.isLoadingResults = false;

        if (this.resultsLength === 0) {
          this.noMoreResults = true;
        }
        else {
          this.noMoreResults = false;
        }
      }
    );
  }

  receiveDataSources() {
    this._tableService.dataSourceChanged.pipe(untilDestroyed(this)).subscribe(
      (data: any) => {
        this.data = data.filteredData;
        this.dataSource.data = data.filteredData;
        this.dataConst = data.filteredData;
        this.isLoadingResults = false;
      }
    );
  }

  getTasks(){
    this._tasksService.getTasks().pipe(untilDestroyed(this)).subscribe(
      (data: any[]) => {
        this.data = data;
        this.dataConst = data;
        this.dataSource.data = this.data;
        this.isLoadingResults = false;
        this.resultsLength = data.length;
      }
    )
  }

  search(){
    this._tableService.searchUser(this.searchTerm);
  }

  adicionar(){
    this._tableService.adicionarPagamento();
  }

  editar(item: any){
    this._tableService.editarPagamento(item);
    this.searchTerm = '';
    this.search();
  }

  remover(item: any){
    this._tableService.removerPagamento(item);
    this.searchTerm = '';
    this.search();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
