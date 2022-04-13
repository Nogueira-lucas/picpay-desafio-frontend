import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

  @Input()
  type: 'default' | 'white' = 'default'
  
  @Input()
  image: string = 'assets/images/logo.png'

  ngOnInit() {
    this.image = this.type === 'white' ? 'assets/images/logo_white.png' : 'assets/images/logo.png'
  }
}
