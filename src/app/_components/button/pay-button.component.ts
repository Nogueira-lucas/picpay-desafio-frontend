import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ButtonConfig } from './button-config';

@Component({
  selector: 'pay-button',
  templateUrl: './pay-button.component.html',
  styleUrls: ['./pay-button.component.scss']
})
export class PayButtonComponent implements OnInit {
  
  @Input() config: ButtonConfig;
  @Input() disabled: boolean;
  
  @Output() onClick = new EventEmitter<any>();

  class = '';
  
  constructor() {}

  ngOnInit(): void {
    this.class = this.config.type;
  }

  onClickButton(event) {
    this.onClick.emit(event);
  }

}