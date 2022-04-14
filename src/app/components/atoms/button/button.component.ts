import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent{

  @Input()
  primary = true;

  @Input()
  size: 'small' | 'medium' | 'large' | 'full' = 'medium';

  @Input()
  label: string;

  @Input()
  type: 'button' | 'submit' = 'button';

  @Input()
  icon: string = '';


  @Output() click = new EventEmitter<any>();
  
  onClick(event) {
    this.click.emit(event);
  }

  public get classes(): string[] {
    const mode = this.primary ? 'button--primary' : 'button--secondary';

    return ['button', `button--${this.size}`, mode];
  }

  public get classesIcon(): string[] {
    const icon = !this.icon ? 'disabled' : ''

    return [`material-icons button__icon button__icon--left`, icon];
  }
}
