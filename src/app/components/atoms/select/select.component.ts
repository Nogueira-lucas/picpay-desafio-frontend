import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  @Input()
  defaultSelected: string

  @Input()
  items: string[]

  @Input()
  id: string

  @Input()
  name: string
  
  @Input()
  label: string

  @Output() change = new EventEmitter<any>();

  onChange(event) {
    const target = (<HTMLInputElement>event.target)
    this.change.emit(target.value);
  }

}
