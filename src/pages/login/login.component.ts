import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Account from 'src/models/account.model';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.listAccount()
  }

  goToPayments(){
    this.router.navigate(["home"])
  }

  listAccount(){
    this.accountService.listAccounts().subscribe((response: Account[]) => {
      console.log(response)
    }, error => {
      console.log(error.message)
    })
  }


}
