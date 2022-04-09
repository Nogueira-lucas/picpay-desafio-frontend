import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {

  constructor(
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.snackbar.open('Você será redirecionado!.', 'PayFriends', {
      duration: 2000,
      panelClass: ['orange-snackbar']
    });

    setTimeout(() => {
      this.router.navigate(['/task']);
    }, 2000);
  }

}
