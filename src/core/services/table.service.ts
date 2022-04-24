import { LocalStorageService } from './local-storage.service';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalComponent } from './../../app/componentes/modal/modal.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from './tasks.service';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable({
  providedIn: "root",
})

@UntilDestroy()
export class TableService {

  data: any[] = [];
  dataConst: any[] = [];
  searchTerm: string = '';
  dialogRef!: MatDialogRef<ModalComponent>;
  dataSource = new MatTableDataSource(this.data);
  resultsLength = 0;
  inputGroup: any[] = this.createInputGroup();

  @Output()
  dataSourceChanged: EventEmitter<any> = new EventEmitter();

  @Output()
  resultsLengthChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    private _tasksService: TasksService,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    public currencyPipe: CurrencyPipe,
    private _liveAnnouncer: LiveAnnouncer,
    private _localStorageService: LocalStorageService
  ) {}

  getTasks() {
    this._tasksService
      .getTasks()
      .pipe(untilDestroyed(this))
      .subscribe((data: any[]) => {
        this.data = data;
        this.dataConst = data;
        this.dataSource.data = this.data;
        this.resultsLength = data.length;

        this.emitDataSourceChanged();
        this.emitResultsLengthChanged();
      });
  }

  createInputGroup(){
    return [
      {
        name: 'name',
        type: 'text',
        label: 'Nome*',
        placeholder: 'Nome',
        formControlName: 'nome'
      },
      {
        name: 'username',
        type: 'text',
        label: 'Usuário*',
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
        name: 'isPayed',
        type: 'checkbox',
        label: 'Pago',
        placeholder: 'Pago',
        formControlName: 'pago',
        isPayed: null,
      },
      {
        name: 'title',
        type: 'text',
        label: 'Título*',
        placeholder: 'Título',
        formControlName: 'titulo'
      },
      {
        name: 'date',
        type: 'datetime-local',
        label: 'Data*',
        placeholder: 'Data',
        formControlName: 'data'
      },
      {
        name: 'value',
        type: 'number',
        label: 'Valor*',
        placeholder: 'Valor',
        formControlName: 'valor'
      }
    ]
  }

  search(searchTerm: string, selectedFilter: string){
    if(selectedFilter == 'user'){
      this.searchUser(searchTerm);
    }
    if(selectedFilter == 'title'){
      this.searchTitle(searchTerm);
    }
    if(selectedFilter == 'value'){
      this.searchValue(searchTerm);
    }
    if(selectedFilter == 'date'){
      this.searchDate(searchTerm);
    }
  }

  searchUser(searchTerm: string){
    this.dataSource.data = this.data.filter(item => item.username.includes(searchTerm) || item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    this.resultsLength = this.dataSource.data.length;

    this.emit();
  }

  searchTitle(searchTerm: string){
    this.dataSource.data = this.data.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    this.resultsLength = this.dataSource.data.length;

    this.emit();
  }

  searchValue(searchTerm: string){
    this.dataSource.data = this.data.filter(item => item.value.toString().includes(searchTerm));
    this.resultsLength = this.dataSource.data.length;

    this.emit();
  }

  searchDate(searchTerm: string){
    this.dataSource.data = this.data.filter(item => this.datepipe.transform(item.date, 'dd/MM/yyyy').includes(searchTerm));
    this.resultsLength = this.dataSource.data.length;

    this.emit();
  }

  removerPagamento(data: any){
    this.dialogRef = this.dialog.open(ModalComponent, {
      disableClose: false,
    });
    this.dialogRef.componentInstance.title = 'Excluir pagamento';
    this.dialogRef.componentInstance.operacao = 'apagar';
    this.inputGroup[3].isPayed = data.isPayed;
    this._localStorageService.set('data', data);
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
    this.dialogRef = this.dialog.open(ModalComponent, {
      disableClose: false,
    });
    this.dialogRef.componentInstance.title = 'Editar pagamento';
    this.dialogRef.componentInstance.operacao = 'editar';
    this._localStorageService.set('data', data);
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
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  emit(){
    this.emitDataSourceChanged();
    this.emitResultsLengthChanged();
  }

  emitDataSourceChanged(){
    this.dataSourceChanged.emit(this.dataSource);
  }

  emitResultsLengthChanged(){
    this.resultsLengthChanged.emit(this.resultsLength);
  }
}
