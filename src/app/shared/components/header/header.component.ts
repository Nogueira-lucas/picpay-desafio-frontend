import { Component, OnInit } from '@angular/core';
import { UserFacade } from 'src/app/facade/user.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private userFacade: UserFacade) { }

  ngOnInit() { }

  logout() {
    this.userFacade.logout();
  }

}
