import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor() { }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !!token;
    }

    authenticate = (data: any): void => this.setLocalStorageToken(this.generateToken(data));
    generateToken = (data: any): string => JSON.stringify(data);
    setLocalStorageToken = (token: string): void => localStorage.setItem('token', token);
}