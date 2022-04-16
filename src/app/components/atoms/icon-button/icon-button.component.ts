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

  @Output() callback = new EventEmitter<any>();

  onClick(event) {
    !!this.callback && this.callback.emit({event, 'data-id': this.attrData});
  }

}
