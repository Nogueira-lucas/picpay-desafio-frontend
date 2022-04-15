import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @Output() callback = new EventEmitter<any>();

  onSubmit(value) {
    !!this.callback && this.callback.emit(value)
  }

}
