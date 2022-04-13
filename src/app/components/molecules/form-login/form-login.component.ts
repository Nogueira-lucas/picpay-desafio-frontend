import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent {

  formValue: object = {}

  @Output() sentForm = new EventEmitter<any>();

  onKeyUp(value){
    this.formValue = {...this.formValue, ...value}
  }

  onSubmit(event){
    event.preventDefault()
    this.sentForm.emit(this.formValue)
  }
}
