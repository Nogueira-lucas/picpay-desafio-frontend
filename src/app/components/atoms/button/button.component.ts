import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent{

  @Input()
  primary = false;

  @Input()
  size: 'small' | 'medium' | 'large' | 'full' = 'medium';

  @Input()
  label = 'Button';

  @Input()
  type: 'button' | 'submit' = 'button';

  @Input() callbackFunction: (args: any) => void;

  @Output() click = new EventEmitter<any>();
  onClick() {
    this.click.emit();
    this.callbackFunction('oláa')
  }

  public get classes(): string[] {
    const mode = this.primary ? 'button--primary' : 'button--secondary';

    return ['button', `button--${this.size}`, mode];
  }

}
