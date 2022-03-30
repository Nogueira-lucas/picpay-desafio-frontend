import { Injectable } from '@angular/core';
import { AccountModel } from '@models/account.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor() { }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !!token;
    }

    getUserData = (): AccountModel => JSON.parse(localStorage.getItem('token'));
    authenticate = (data: any): void => this.setLocalStorageToken(this.generateToken(data));
    generateToken = (data: any): string => JSON.stringify(data);
    setLocalStorageToken = (token: string): void => localStorage.setItem('token', token);
    logout = (): void => localStorage.removeItem('token');
}