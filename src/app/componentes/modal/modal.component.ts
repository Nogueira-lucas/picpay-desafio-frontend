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
  description: string = 'Modal';

  @Input()
  data: any[] = [];

  @Input()
  btnFechar: string = 'Cancelar';
  
  @Input()
  btnConfirmar: string = 'Confirmar';

  @Output()
  confirmar = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<ModalComponent>) { }

  ngOnInit() {
  }

  confirmarClick(){
    this.confirmar.emit();
    this.dialogRef.close();
  }
}
