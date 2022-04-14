import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {

  @Input()
  name: string

  @Output() click = new EventEmitter<any>();

  onClick(event) {
    this.click.emit(event);
  }

}
