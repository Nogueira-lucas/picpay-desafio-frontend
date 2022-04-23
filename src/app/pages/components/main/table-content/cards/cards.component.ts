import { ModalComponent } from './../../../../../componentes/modal/modal.component';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from './../../../../../../core/services/tasks.service';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/core/services/table.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})

@UntilDestroy()
export class CardsComponent implements OnInit {

  resultsLength = 0;
  isLoadingResults = true;
  data: any;
  dataConst: any[] = [];
  searchTerm: string = '';
  dialogRef!: MatDialogRef<ModalComponent>;
  qtdItens: number = 10;
  noMoreResults: boolean = false;
  selectedFilter: string = 'user';
  filterOptions: string[] = ['user', 'title', 'value', 'date'];

  constructor(
    private _tableService: TableService,
    private _tasksService: TasksService,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    public currencyPipe: CurrencyPipe,
  ) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this.getTasks();
    this._tableService.getTasks();
    this.receiveResultsLength();
    this.receiveDataSources();
  }

  getTasks() {
    this._tasksService
      .getTasks()
      .pipe(untilDestroyed(this))
      .subscribe((data: any[]) => {
        this.data = data;
        this.dataConst = data;
        this.resultsLength = data.length;
      });
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
        this.dataConst = data;
        this.isLoadingResults = false;
      }
    );
  }

  verMaisItens(){
    this.qtdItens += 10;
  }

  search(){
    this._tableService.search(this.searchTerm, this.selectedFilter);
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

  getPlaceholder(){
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

  changeSelectedFilter(filter: string){
    this.selectedFilter = filter;
    this.getPlaceholder();
  }
}
