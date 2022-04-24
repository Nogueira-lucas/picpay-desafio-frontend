import { LocalStorageService } from './local-storage.service';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  darkMode: boolean = false;

  constructor(
    private _localStorageService: LocalStorageService
  ) {}

  getDarkTheme(): boolean{
    this.darkMode = JSON.parse(this._localStorageService.get('darkMode'));
    if(this.darkMode){
      document.body.classList.add("dark-theme");
    }
    else{
      document.body.classList.remove("dark-theme");
    }
    this._localStorageService.set('darkMode', this.darkMode);
    return this.darkMode;
  }

  toggleTheme(): void {
    document.body.classList.toggle("dark-theme");
    this.darkMode = !this.darkMode;
    this._localStorageService.set("darkMode", this.darkMode);
  }
}
