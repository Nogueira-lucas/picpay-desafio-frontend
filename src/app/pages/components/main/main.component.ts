import { LocalStorageService } from './../../../../core/services/local-storage.service';
import { AuthService } from './../../../../core/services/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {

  config: CountdownConfig = {
    leftTime: 0,
  };
  dateNow: Date = new Date();
  dateCountdown: Date;

  constructor(
    private _authService: AuthService,
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    const expiration = this._localStorageService.get('expirationTime');
    this.dateCountdown = new Date(parseInt(expiration));
    const diff = this.dateCountdown.getTime() - this.dateNow.getTime();
    const Seconds_Between_Dates = Math.abs(diff / 1000);
    this.config.leftTime = Seconds_Between_Dates;
  }

  logout(){
    this._authService.logout();
  }
}
