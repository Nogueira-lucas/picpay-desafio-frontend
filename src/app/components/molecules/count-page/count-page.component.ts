import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-count-page',
  templateUrl: './count-page.component.html',
  styleUrls: ['./count-page.component.scss']
})
export class CountPageComponent {

  @Input()
  list: string[]

  @Input()
  current: number = 0

  @Input()
  total: number = 0
  
  @Input()
  limit: number = 10
  
  pages: number[]
  
  @Output() trigger = new EventEmitter<any>();
  
  ngOnInit(){
    this.pages = Array.from(new Array(this.total/this.limit), (v, k) => k)
  }

  onClick(value: string){
    this.current = parseInt(value)
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
