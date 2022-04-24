import { MatSnackBar } from '@angular/material/snack-bar';
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
  selectedFilter: string = 'user';
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
    private _localStorageService: LocalStorageService,
    private _snackBar: MatSnackBar
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
    this.selectedFilter = selectedFilter
    this.searchTerm = searchTerm;

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

    this.emit();
  }

  searchTitle(){
    this.dataSource.data = this.data.filter(item => item.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.resultsLength = this.dataSource.data.length;

    this.emit();
  }

  searchValue(){
    this.dataSource.data = this.data.filter(item => item.value.toString().includes(this.searchTerm));
    this.resultsLength = this.dataSource.data.length;

    this.emit();
  }

  searchDate(){
    this.dataSource.data = this.data.filter(item => this.datepipe.transform(item.date, 'dd/MM/yyyy').includes(this.searchTerm));
    this.resultsLength = this.dataSource.data.length;

    this.emit();
  }

  removerPagamento(data: any){
    this.dialogRef = this.dialog.open(ModalComponent, {
      disableClose: false,
      maxHeight: '90vh'
    });
    this.dialogRef.componentInstance.title = 'Excluir pagamento';
    this.dialogRef.componentInstance.operacao = 'apagar';
    this._localStorageService.set('data', data);
    this.dialogRef.componentInstance.description = 
    'Usuário: ' + data.name + ' - @' + data.username + '<br>' +
    'Data: ' + this.datepipe.transform(data.date, 'dd/MM/yyyy') + '<br>' +
    'Valor: ' + this.currencyPipe.transform(data.value, 'BRL', 'symbol', '1.2-2');
    this.dialogRef.componentInstance.confirmar.pipe(untilDestroyed(this)).subscribe(() => {
      this._tasksService.deleteTask(data.id).pipe(untilDestroyed(this)).subscribe(
        (data: any) => {
          this.openSnackBar('Operação realizada com sucesso!');
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
      maxHeight: '90vh'
    });
    this.dialogRef.componentInstance.title = 'Editar pagamento';
    this.dialogRef.componentInstance.operacao = 'editar';
    this._localStorageService.set('data', data);
    this.dialogRef.componentInstance.description = '';
    this.dialogRef.componentInstance.inputGroup = this.inputGroup;

    this.dialogRef.componentInstance.novoItem.pipe(untilDestroyed(this))
    .subscribe((data: any) => {
      this._tasksService.patchTask(data).pipe(untilDestroyed(this)).subscribe(
        (data: any) => {
          this.openSnackBar('Operação realizada com sucesso!');
          this.getTasks();
        })
    });
    this.dialogAfterClosed();
  }

  adicionarPagamento(){
    this.dialogRef = this.dialog.open(ModalComponent, {
      disableClose: false,
      maxHeight: '90vh'
    });
    this.dialogRef.componentInstance.title = 'Adicionar pagamento';
    this.dialogRef.componentInstance.operacao = 'adicionar';
    this.dialogRef.componentInstance.description = '';
    this.dialogRef.componentInstance.inputGroup = this.inputGroup;

    this.dialogRef.componentInstance.novoItem.pipe(untilDestroyed(this))
    .subscribe((data: any) => {
      this._tasksService.postTask(data).pipe(untilDestroyed(this)).subscribe(
        (data: any) => {
          this.openSnackBar('Operação realizada com sucesso!');
          this.getTasks();
        })
    });
    this.dialogAfterClosed();
  }

  adicionarPagamentoMesmoUsuario(item: any){
    this.dialogRef = this.dialog.open(ModalComponent, {
      disableClose: false,
      maxHeight: '90vh',
    });
    this.dialogRef.componentInstance.title = 'Adicionar pagamento';
    this.dialogRef.componentInstance.operacao = 'adicionar-mesmo-usuario';
    this.dialogRef.componentInstance.description = '';
    this._localStorageService.set('data', item);
    this.dialogRef.componentInstance.inputGroup = this.inputGroup;

    this.dialogRef.componentInstance.novoItem.pipe(untilDestroyed(this))
    .subscribe((data: any) => {
      this._tasksService.postTask(data).pipe(untilDestroyed(this)).subscribe(
        (data: any) => {
          this.openSnackBar('Operação realizada com sucesso!');
          this.getTasks();
        })
    });
    this.dialogAfterClosed();
  }
  
  patchIsPayed(data: any){
    this._tasksService.patchIsPayed(data).pipe(untilDestroyed(this)).subscribe(
      (data: any) => {
        this.getTasks();
      }, error => {
        this.openSnackBar('Erro ao realizar a operação!');
      })
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
    this.search(this.searchTerm, this.selectedFilter);
  }

  emitResultsLengthChanged(){
    this.resultsLengthChanged.emit(this.resultsLength);
  }

  openSnackBar(message: string){
    this._snackBar.open(message, 'Fechar', {
      duration: 4000,
    });
  }
}
