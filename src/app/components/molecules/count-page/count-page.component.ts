import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-count-page',
  templateUrl: './count-page.component.html',
  styleUrls: ['./count-page.component.scss']
})
export class CountPageComponent {

  @Input()
  total: number

  @Input()
  current: number = 1
  
  @Input()
  limit
  
  pages: number[]
  
  @Output() trigger = new EventEmitter<any>();
  
  ngOnChanges(){
    this.pages = Array.from(new Array(Math.round(this.total/this.limit)), (v, k) => k)
  }
  
  onClick(value: string | number){
    
    this.current = parseInt(`${value}`)
    this.trigger.emit(value);
  }
  
  prev(){
    const prev = this.current - 1
    this.current = prev
    this.trigger.emit(prev);
  }
  next(){
    const next = this.current + 1
    
    this.current = next
    this.trigger.emit(next);
  }

}
