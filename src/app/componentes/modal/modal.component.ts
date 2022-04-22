import { PagamentoModel } from './../../../core/model/pagamento.model';
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
  data: PagamentoModel;

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

  modalForm = this._formBuilder.group(
    {
      nome: ['', Validators.required],
      usuario: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      data: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      pago: ['', [Validators.required]]
    });
  
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private _formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    if(this.operacao === 'editar'){
      this.modalForm.get('nome').setValue(this.data.name);
      this.modalForm.get('usuario').setValue(this.data.username);
      this.modalForm.get('titulo').setValue(this.data.title);
      this.modalForm.get('data').setValue(this.data.date);
      this.modalForm.get('valor').setValue(this.data.value);
      this.modalForm.get('pago').setValue(this.data.isPayed);
    }
  }

  confirmarClick(){
    if(this.operacao === 'editar'){
      this.submitFormEditar();
    }
    else if(this.operacao === 'apagar'){
      this.submitFormApagar();
    }
  }

  submitFormEditar(){
    let pagamento: PagamentoModel = new PagamentoModel();
    pagamento.id = this.data.id;
    pagamento.name = this.modalForm.get('nome').value;
    pagamento.username = this.modalForm.get('usuario').value;
    pagamento.title = this.modalForm.get('titulo').value;
    pagamento.value = this.modalForm.get('valor').value;
    pagamento.date = this.modalForm.get('data').value;
    pagamento.isPayed = JSON.parse(this.modalForm.get('pago').value);
    pagamento.image = this.data.image;
    this.novoItem.emit(pagamento);
    this.dialogRef.close();
  }

  submitFormApagar(){
    this.confirmar.emit();
    this.dialogRef.close();
  }

  toggleIsPayed(input: any){
    if(input.type == 'checkbox'){
      this.modalForm.get('pago').setValue(input.isPayed = !input.isPayed);
    }
  }
}