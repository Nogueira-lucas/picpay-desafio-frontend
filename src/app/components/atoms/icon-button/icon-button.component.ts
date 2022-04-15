import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {

  @Input()
  name: string

  @Input()
  attrData: string

  @Output() play = new EventEmitter<any>();

  onClick(event) {
    !!this.play && this.play.emit({event, 'data-id': this.attrData});
  }

}
