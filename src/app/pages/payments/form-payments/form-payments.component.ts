import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-payments',
  templateUrl: './form-payments.component.html',
  styleUrls: ['./form-payments.component.scss']
})
export class FormPaymentsComponent {

  @Input() show: boolean
  @Output() hide = new EventEmitter()

  onHide(){
    this.hide.emit()
  }

  onSubmit(e, data: NgForm): void{
    e.preventDefault()
  }
}
