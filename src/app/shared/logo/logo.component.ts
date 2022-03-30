import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pf-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  @Input('type')
  type: 'dark'

  ngOnInit(): void {
  }

  goToTasks() {
    this._router.navigateByUrl('/tasks');
  }

}
