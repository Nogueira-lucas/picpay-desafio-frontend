import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('mdProfile') public mdProfile: ModalDirective;

  constructor(private authenticationService: AuthenticationService ) { }

  ngOnInit(): void {
  }

  showModal() {
    this.mdProfile.show();
  }

  logout() {
    this.authenticationService.logout();
  }

}
