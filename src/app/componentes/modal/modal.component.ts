import { LocalStorageService } from './../../../core/services/local-storage.service';
import { PagamentoInserirModel, PagamentoModel } from './../../../core/model/pagamento.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

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
      pago: ['', [Validators.required]]
    });
  
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private _formBuilder: FormBuilder,
    private _localStorageService: LocalStorageService
    ) { }

  ngOnInit() {
    if(this.operacao == 'editar'){
      this.data = JSON.parse(this._localStorageService.get('data'));
      var isPayed = this.data.isPayed ? true : false;
      
      this.modalForm.get('nome').setValue(this.data.name);
      this.modalForm.get('usuario').setValue(this.data.username);
      this.modalForm.get('image').setValue(this.data.image);
      this.modalForm.get('titulo').setValue(this.data.title);
      this.modalForm.get('data').setValue(this.data.date);
      this.modalForm.get('valor').setValue(this.data.value);
      this.modalForm.get('pago').setValue(isPayed);
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
      this.modalForm.get('image').value ? this.modalForm.get('image').value : this.data.image,
      JSON.parse(this.modalForm.get('pago').value),
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
      JSON.parse(this.modalForm.get('pago').value),
    );
    this.novoItem.emit(pagamento);
    this.closeDialog()
  }

  toggleIsPayed(input: any){
    if(input.type == 'checkbox'){
      this.modalForm.get('pago').setValue(input.isPayed = !input.isPayed);
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }
}