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

  @Input() callbackChange: () => string;
  @Input() callbackBlur: () => string;
  @Input() callbackKeyUp: () => string;

  @Output() change = new EventEmitter<any>();

  @Output() blur = new EventEmitter<any>();

  @Output() keyup = new EventEmitter<any>();
  
  onChange() {
    this.change.emit();
    this.callbackChange();
  }

  onBlur() {
    this.blur.emit();
    this.callbackBlur();
  }

  onKeyUp() {
    this.keyup.emit();
    this.callbackKeyUp();
  }

  public get classes(): string[] {
    return ['input__input', `input__input--${this.styleInput}`];
  }

  public get labelClasses(): string[] {
    const disabledValue = this.styleInput !== 'login' ? 'input--disabled' : '';
    console.log('disabled: ', disabledValue);
    return ['input__label', disabledValue];
  }

}
