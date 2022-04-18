import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ButtonConfig } from './buttonConfig';

@Component({
  selector: 'pay-button',
  templateUrl: './pay-button.component.html',
  styleUrls: ['./pay-button.component.scss']
})
export class PayButtonComponent implements OnInit {
  
  @Input() disabled: boolean;
  @Input() buttonConfig: ButtonConfig;
  
  @Output() onClick = new EventEmitter<any>();

  class = "";
  
  constructor() {}

  ngOnInit(): void {
    if (this.buttonConfig.primary) this.class += "primary";
  }

  onClickButton(event) {
    this.onClick.emit(event);
  }

}