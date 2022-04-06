import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Output() changedSearch = new EventEmitter();

  constructor() { }

  filter(search?: string) {
    this.changedSearch.emit(search);
  }
}
