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

  @Output() out = new EventEmitter<any>();

  @Output() typing = new EventEmitter<any>();

  onBlur(event: KeyboardEvent) {
    !!this.out && this.out.emit(
      {
        label: (<HTMLInputElement>event.target).id,
        value: (<HTMLInputElement>event.target).value
      }
    );
  }

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
