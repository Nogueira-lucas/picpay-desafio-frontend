import { ThemeService } from './../../../../core/services/theme.service';
import { LocalStorageService } from './../../../../core/services/local-storage.service';
import { AuthService } from './../../../../core/services/auth.service';
import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, AfterViewInit {

  config: CountdownConfig = {
    leftTime: 0,
  };
  dateNow: Date = new Date();
  dateCountdown: Date;
  darkMode: boolean = false;
  numbers: number[] = [1,2,3,4,5,6,7,8,9,10];
  expirationTime = this._localStorageService.get('expirationTime');

  constructor(
    private _authService: AuthService,
    private _localStorageService: LocalStorageService,
    private _themeService: ThemeService
  ) { }

  ngOnInit() {
    this.darkMode = this._themeService.getDarkTheme();
    this.getConfig();
  }

  ngAfterViewInit(){
    this.getConfig();
  }

  logout(): void{
    this._authService.logout();
  }

  toggleTheme(): void{
    this.darkMode = !this.darkMode;
    this._themeService.toggleTheme();
  }

  getConfig(){
    this.dateCountdown = new Date(parseInt(this.expirationTime));
    const diff = this.dateCountdown.getTime() - this.dateNow.getTime();
    const Seconds_Between_Dates = Math.abs(diff / 1000);
    this.config = {
      leftTime: Seconds_Between_Dates,
    };
  }
}
