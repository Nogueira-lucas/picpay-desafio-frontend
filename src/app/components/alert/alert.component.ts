import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { Alert } from 'src/app/models/alert';



@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit {

  @Input()
  public alert: Alert
  

  constructor() {  }

  ngOnInit(): void {
  
  }

  
}
