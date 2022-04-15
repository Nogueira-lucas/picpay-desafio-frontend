import { Component, EventEmitter, Input, Output } from '@angular/core';
import { listenerCount } from 'process';

@Component({
  selector: 'app-count-page',
  templateUrl: './count-page.component.html',
  styleUrls: ['./count-page.component.scss']
})
export class CountPageComponent {

  @Input()
  list: string[]

  @Input()
  current = '0'

  total: string
  
  @Output() trigger = new EventEmitter<any>();
  
  ngOnInit(){
    this.total = `${this.list?.length - 1}`
  }

  onClick(value: string){
    this.current = value
    this.trigger.emit(value);
  }
  
  prev(){
    const prev = `${parseInt(this.current) - 1}`
    this.current = prev
    this.trigger.emit(prev);
  }
  next(){
    const next = `${parseInt(this.current) + 1}`
    this.current = next
    this.trigger.emit(next);
  }

}
