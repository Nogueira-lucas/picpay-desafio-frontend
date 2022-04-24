import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PagamentoInserirModel, PagamentoModel } from './../../../core/model/pagamento.model';
import { LocalStorageService } from './../../../core/services/local-storage.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input()
  title: string = 'Modal';

  @Input()
  description: string = '';

  @Input()
  inputGroup: any[] = [];

  @Input()
  btnFechar: string = 'CANCELAR';
  
  @Input()
  btnConfirmar: string = 'SALVAR';

  @Input()
  operacao: string = 'editar';

  @Output()
  confirmar = new EventEmitter();

  @Output() 
  novoItem = new EventEmitter<PagamentoModel>();

  data: any = {};

  modalForm = this._formBuilder.group(
    {
      nome: ['', Validators.required],
      usuario: ['', [Validators.required]],
      image: [''],
      titulo: ['', [Validators.required]],
      data: ['', [Validators.required]],
      valor: ['', [Validators.required]],
    });
  
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private _formBuilder: FormBuilder,
    private _localStorageService: LocalStorageService
    ) { }

  ngOnInit() {
    if(this.operacao == 'editar'){
      this.data = JSON.parse(this._localStorageService.get('data'));

      if(this.data && this.data.date.length > 16){
        this.data.date = this.data.date.slice(0,16);
      }      
      this.modalForm.get('nome').setValue(this.data?.name);
      this.modalForm.get('usuario').setValue(this.data?.username);
      this.modalForm.get('image').setValue(this.data?.image);
      this.modalForm.get('titulo').setValue(this.data?.title);
      this.modalForm.get('data').setValue(this.data?.date);
      this.modalForm.get('valor').setValue(this.data?.value);
    }
    else if(this.operacao == 'adicionar'){
      this.modalForm.get('data').setValue(new Date().toISOString().slice(0,16));
    }
  }

  confirmarClick(){
    if(this.operacao === 'editar'){
      this.submitFormEditar();
    }
    else if(this.operacao === 'apagar'){
      this.submitFormApagar();
    }
    else if(this.operacao === 'adicionar'){
      this.submitFormAdicionar();
    }
  }

  submitFormEditar(){
    let pagamento: PagamentoModel = new PagamentoModel(
      this.data.id,
      this.modalForm.get('nome').value,
      this.modalForm.get('usuario').value,
      this.modalForm.get('titulo').value,
      this.modalForm.get('valor').value,
      this.modalForm.get('data').value,
      this.modalForm.get('image').value ? this.modalForm.get('image').value : this.data.image
    );
    this.novoItem.emit(pagamento);
    this.closeDialog();
  }

  submitFormApagar(){
    this.confirmar.emit();
  }

  submitFormAdicionar(){
    let pagamento: PagamentoModel = new PagamentoInserirModel(
      this.modalForm.get('nome').value,
      this.modalForm.get('usuario').value,
      this.modalForm.get('titulo').value,
      this.modalForm.get('valor').value,
      this.modalForm.get('data').value,
      this.modalForm.get('image').value,
      true,
    );
    this.novoItem.emit(pagamento);
    this.closeDialog()
  }

  closeDialog(){
    this.dialogRef.close();
  }

  formInvalid(){
    if(this.operacao == 'apagar'){
      return false;
    }

    if(this.modalForm.get('nome').value?.length > 0 
      && this.modalForm.get('usuario').value.length > 0
      && this.modalForm.get('titulo').value.length > 0
      && this.modalForm.get('valor').value.toString().length > 0
      && this.modalForm.get('data').value.length > 0
      ){
        return false;
      }
      return true;
  }
}