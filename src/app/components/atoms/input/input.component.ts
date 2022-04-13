import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input()
  id: string;

  @Input()
  styleInput: 'search' | 'login' | 'default' = 'default';

  @Input()
  label: 'Email' | 'Senha';

  @Input()
  placeholder: string;

  @Input()
  type: 'text' | 'password' = 'text';


  @Output() typing = new EventEmitter<any>();

  onKeyUp(event: KeyboardEvent) {
    const target = (<HTMLInputElement>event.target)
    const label = target.id
    !!this.typing && this.typing.emit( {
      [label]: target.value
    });
  }

  public get classes(): string[] {
    return ['input__input', `input__input--${this.styleInput}`];
  }

  public get labelClasses(): string[] {
    const disabledValue = this.styleInput !== 'login' ? 'input--disabled' : '';
    return ['input__label', disabledValue];
  }

}
