import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";

import { User } from "../_models/user";
import { Router } from "@angular/router";
import { NotifierService } from 'angular-notifier';

@Injectable({ providedIn: 'root' })
export class UserService {

    private readonly serviceUrl = environment.apiUrl + "users/";

    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private http: HttpClient,
        private router: Router,
        private notifierService: NotifierService
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email, password): Observable<User> {

        if (!password) return;

        return this.http.get<User[]>(`${this.serviceUrl}?email=${email}`)
            .pipe(
                map(userList => {
                    if (!userList.length) {
                        const message = 'Conta não encontrada';
                        this.notifierService.notify('warning', message);
                        throw Error(message);
                    }
                    if (userList[0].password !== password) {
                        const message = 'Senha inválida';
                        this.notifierService.notify('warning', message);
                        throw Error(message);
                    }

                    userList[0].token = "fake-jwt-token"

                    localStorage.setItem('user', JSON.stringify(userList[0]));
                    this.userSubject.next(userList[0]);
                    return userList[0];
                })
            );
    }

    logout() {
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/user/login']);
    }

}