import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pf-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {

  @Input('title')
  title = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
