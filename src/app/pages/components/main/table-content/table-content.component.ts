import { Component, HostListener, OnInit } from '@angular/core';
const md = 768;

@Component({
  selector: 'app-table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['./table-content.component.scss']
})
export class TableContentComponent implements OnInit {

  isMobile: boolean = false;

  constructor() { }

  ngOnInit() {
    this.checkWidth();
  }

  checkWidth() {
    if (window.innerWidth <= md) {
      this.isMobile = true;
    }
    else {
      this.isMobile = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    if (event.target.innerWidth <= md) {
      this.isMobile = true;
    }
    else {
      this.isMobile = false;
    }
  }
}
