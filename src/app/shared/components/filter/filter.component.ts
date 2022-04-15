import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() changedSearch = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  filter(search?: string) {
    this.changedSearch.emit(search);
  }
}
