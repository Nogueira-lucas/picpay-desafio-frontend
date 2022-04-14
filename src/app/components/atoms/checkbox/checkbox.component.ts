import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {

  @Input()
  name: string

  @Input()
  checked: boolean

  @Output() check = new EventEmitter<any>();
  
  onClick(event: KeyboardEvent){
    const target = (<HTMLInputElement>event.target)
    this.checked = target.checked
    !!this.check && this.check.emit();
  }
  
  public get classes(): string[] {
    const check = !!this.checked ? 'checkbox--checked' : ''
    return ['checkbox', check];
  }

}
