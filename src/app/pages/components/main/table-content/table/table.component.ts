import { ModalComponent } from './../../../../../componentes/modal/modal.component';
import { TasksService } from './../../../../../../core/services/tasks.service';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

@UntilDestroy()
export class TableComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['usuario', 'titulo', 'data', 'valor', 'pago', 'acoes'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  data: any[] = [];
  dataConst: any[] = [];
  dataSource = new MatTableDataSource<Element>(this.data);
  searchTerm: string = '';
  dialogRef!: MatDialogRef<ModalComponent>;
  inputGroup: any[] = this.createInputGroup();

  @Input() isMobile: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private _tasksService: TasksService,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    public currencyPipe: CurrencyPipe
  ) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this.getTasks();
  }

  ngAfterViewInit() {
  }

  createInputGroup(){
    return [
      {
        name: 'name',
        type: 'text',
        label: 'Nome',
        placeholder: 'Nome',
        formControlName: 'nome'
      },
      {
        name: 'username',
        type: 'text',
        label: 'Usuário',
        placeholder: 'Usuário',
        formControlName: 'usuario'
      },
      {
        name: 'title',
        type: 'text',
        label: 'Título',
        placeholder: 'Título',
        formControlName: 'titulo'
      },
      {
        name: 'date',
        type: 'date',
        label: 'Data',
        placeholder: 'Data',
        formControlName: 'data'
      },
      {
        name: 'value',
        type: 'number',
        label: 'Valor',
        placeholder: 'Valor',
        formControlName: 'valor'
      },
      {
        name: 'isPayed',
        type: 'checkbox',
        label: 'Pago',
        placeholder: 'Pago',
        formControlName: 'pago',
        isPayed: null,
      }
    ]
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

  searchUser(){
    this.isLoadingResults = true;
    this.dataSource.data = this.data.filter(item => item.username.includes(this.searchTerm));
    this.resultsLength = this.dataSource.data.length;
    this.isLoadingResults = false;
  }

  removerPagamento(data: any){
    this.isLoadingResults = true;
    this.dialogRef = this.dialog.open(ModalComponent, {
      disableClose: false,
    });
    this.dialogRef.componentInstance.title = 'Excluir pagamento';
    this.dialogRef.componentInstance.operacao = 'apagar';
    this.inputGroup[5].isPayed = data.isPayed;
    this.dialogRef.componentInstance.data = data;
    this.dialogRef.componentInstance.description = 
    'Usuário: ' + data.name + ' - @' + data.username + '<br>' +
    'Data: ' + this.datepipe.transform(data.date, 'dd/MM/yyyy') + '<br>' +
    'Valor: ' + this.currencyPipe.transform(data.value, 'BRL', 'symbol', '1.2-2');
    this.dialogRef.componentInstance.confirmar.pipe(untilDestroyed(this)).subscribe(() => {
      this._tasksService.deleteTask(data.id).pipe(untilDestroyed(this)).subscribe(
        (data: any) => {
          this.getTasks();
        }
      )
      this.dialogRef.close();
    });
    this.dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe(result => {
      this.dialogRef = null;
      this.isLoadingResults = false;
    });
  }

  editarPagamento(data: any){
    this.isLoadingResults = true;
    this.dialogRef = this.dialog.open(ModalComponent, {
      disableClose: false,
    });
    this.dialogRef.componentInstance.title = 'Editar pagamento';
    this.dialogRef.componentInstance.operacao = 'editar';
    this.dialogRef.componentInstance.data = data;
    this.dialogRef.componentInstance.description = '';
    this.dialogRef.componentInstance.inputGroup = this.inputGroup;

    this.dialogRef.componentInstance.novoItem.pipe(untilDestroyed(this))
    .subscribe((data: any) => {
      this._tasksService.putTask(data).pipe(untilDestroyed(this)).subscribe(
        (data: any) => {
          this.getTasks();
        })
    });
    this.dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe(result => {
      this.dialogRef = null;
      this.isLoadingResults = false;
    });
  }
}
