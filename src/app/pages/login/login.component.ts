import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { UserFacade } from 'src/app/facade/user.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userFacade: UserFacade) { }

  ngOnInit(): void {

  }

  pagePayments() {
    this.userFacade.login('usuario@gmail.com', 'usuario').subscribe(
      (user) => {
        if (user) {
          this.router.navigate(['page/payments'])
        }
      },
      (error) => {
        throwError(error)
      }
    )
  }
}
