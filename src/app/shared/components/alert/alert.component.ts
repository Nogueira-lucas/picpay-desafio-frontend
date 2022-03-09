import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'component-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() fixed: string
  constructor(public service: AlertService){}
}
