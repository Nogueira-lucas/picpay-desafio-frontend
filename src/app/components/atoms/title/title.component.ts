import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {

  @Input() title: string

  @Input()
  size: 'small' | 'medium' | 'large' = 'medium';

  public get classes(): string[] {

    return ['title', `title--${this.size}`];
  }

}
