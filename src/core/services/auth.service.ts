import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  constructor(
    private http: HttpClient,
    private _localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
  }

  logout() {
    this._localStorageService.remove('accessToken');
  }
}
