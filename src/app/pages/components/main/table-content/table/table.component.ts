import { LocalStorageService } from './../../../../../../core/services/local-storage.service';
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
  filterOptions: string[] = ['user', 'title', 'value', 'date'];

  resultsLength = 0;
  isLoadingResults = true;
  data: any = [];
  dataSource = new MatTableDataSource(this.data);
  dataConst: any[] = [];
  searchTerm: string = '';
  selectedFilter: string = 'user';
  dialogRef!: MatDialogRef<ModalComponent>;
  qtdItens: number = 10;
  noMoreResults: boolean = false;
  darkMode: boolean = false;

  @Input() isMobile: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _tableService: TableService,
    private _tasksService: TasksService,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    public currencyPipe: CurrencyPipe,
    private _liveAnnouncer: LiveAnnouncer,
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this.getTasks();
    this._tableService.getTasks();
    this.receiveResultsLength();
    this.receiveDataSources();
    this.getDarkMode();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  receiveResultsLength(): void {
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

  receiveDataSources(): void {
    this._tableService.dataSourceChanged.pipe(untilDestroyed(this)).subscribe(
      (data: any) => {
        this.data = data.filteredData;
        this.dataSource.data = data.filteredData;
        this.dataConst = data.filteredData;
        this.searchTable();
        this.isLoadingResults = false;
      }
    );
  }

  getTasks(): void{
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

  searchTable() {
    if(this.selectedFilter == 'user'){
      this.searchUser();
    }
    if(this.selectedFilter == 'title'){
      this.searchTitle();
    }
    if(this.selectedFilter == 'value'){
      this.searchValue();
    }
    if(this.selectedFilter == 'date'){
      this.searchDate();
    }
  }

  searchUser(){
    this.dataSource.data = this.data.filter(item => item.username.includes(this.searchTerm) || item.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.resultsLength = this.dataSource.data.length;
  }

  searchTitle(){
    this.dataSource.data = this.data.filter(item => item.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.resultsLength = this.dataSource.data.length;
  }

  searchValue(){
    this.dataSource.data = this.data.filter(item => item.value.toString().includes(this.searchTerm));
    this.resultsLength = this.dataSource.data.length;
  }

  searchDate(){
    this.dataSource.data = this.data.filter(item => this.datepipe.transform(item.date, 'dd/MM/yyyy').includes(this.searchTerm));
    this.resultsLength = this.dataSource.data.length;
  }

  search(): void{
    this._tableService.search(this.searchTerm, this.selectedFilter);
  }

  adicionar(): void{
    this._tableService.adicionarPagamento();
  }

  adicionarMesmoUsuario(item: any): void{
    this._tableService.adicionarPagamentoMesmoUsuario(item);
  }

  editar(item: any): void{
    this._tableService.editarPagamento(item);
    this.search();
  }

  remover(item: any): void{
    this._tableService.removerPagamento(item);
    this.search();
  }

  patchIsPayed(item: any): void{
    this.isLoadingResults = true;
    item.isPayed = !item.isPayed;
    this._tableService.patchIsPayed(item);
  }

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getPlaceholder(): string{
    if(this.selectedFilter == 'user'){
      return 'Pesquisar por usuário';
    }
    else if(this.selectedFilter == 'title'){
      return 'Pesquisar por título';
    }
    else if(this.selectedFilter == 'date'){
      return 'Pesquisar por data';
    }
    else if(this.selectedFilter == 'value'){
      return 'Pesquisar por valor';
    }
  }

  changeSelectedFilter(filter: string): void{
    this.selectedFilter = filter;
    this.getPlaceholder();
  }

  getDarkMode(): void {
    this.darkMode = this._localStorageService.get('darkMode');
  }

  clearSearch(){
    this.searchTerm = '';
    this.search();
  }
}
