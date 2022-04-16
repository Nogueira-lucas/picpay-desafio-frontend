import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  @Input()
  defaultSelected: number
  
  @Input()
  items: string[]
  
  @Input()
  id: string
  
  @Input()
  name: string
  
  @Input()
  label: string
  
  @Output() callback = new EventEmitter<any>();
  
  ngOnInit(){
    console.log('defaultSelected: ', this.defaultSelected);
  }

  onChange(event) {
    const target = (<HTMLInputElement>event.target)
    !!this.callback && this.callback.emit(target.value);
  }

}
