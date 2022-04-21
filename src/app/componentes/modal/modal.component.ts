import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input()
  title: string = 'Modal';

  @Input()
  description: string = 'Modal';

  @Input()
  btnFechar: string = 'Modal';
  
  constructor() { }

  ngOnInit() {
  }

}
