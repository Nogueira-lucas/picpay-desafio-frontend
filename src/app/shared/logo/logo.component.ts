import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pf-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  constructor() { }

  @Input('type')
  type: 'dark'

  ngOnInit(): void {
  }

}
