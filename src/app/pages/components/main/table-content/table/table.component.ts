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
  isRateLimitReached = false;
  data: any[] = [];
  dataConst: any[] = [];
  dataSource = new MatTableDataSource(this.data);
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
    public currencyPipe: CurrencyPipe,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this.getTasks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
        name: 'image',
        type: 'text',
        label: 'Imagem',
        placeholder: 'Url do avatar',
        formControlName: 'image'
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
    this.dataSource.data = this.data.filter(item => item.username.includes(this.searchTerm) || item.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.resultsLength = this.dataSource.data.length;
    this.isLoadingResults = false;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  removerPagamento(data: any){
    this.isLoadingResults = true;
    this.dialogRef = this.dialog.open(ModalComponent, {
      disableClose: false,
    });
    this.dialogRef.componentInstance.title = 'Excluir pagamento';
    this.dialogRef.componentInstance.operacao = 'apagar';
    this.inputGroup[6].isPayed = data.isPayed;
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
    this.dialogAfterClosed();
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
    this.dialogAfterClosed();
  }

  adicionarPagamento(){
    this.isLoadingResults = true;
    this.dialogRef = this.dialog.open(ModalComponent, {
      disableClose: false,
    });
    this.dialogRef.componentInstance.title = 'Adicionar pagamento';
    this.dialogRef.componentInstance.operacao = 'adicionar';
    this.dialogRef.componentInstance.description = '';
    this.dialogRef.componentInstance.inputGroup = this.inputGroup;

    this.dialogRef.componentInstance.novoItem.pipe(untilDestroyed(this))
    .subscribe((data: any) => {
      this._tasksService.postTask(data).pipe(untilDestroyed(this)).subscribe(
        (data: any) => {
          this.getTasks();
        })
    });
    this.dialogAfterClosed();
  }

  dialogAfterClosed(){
    this.dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe(result => {
      this.dialogRef = null;
      this.isLoadingResults = false;
      this.searchTerm = '';
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
