import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";

import { User } from "../_models/user";

@Injectable({ providedIn: 'root' })
export class UserService {

    private readonly serviceUrl = environment.apiUrl + "users/";

    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email, password) {

        // TODO improve login request
        if (!password) return;

        return this.http.get<User[]>(`${this.serviceUrl}?email=${email}`)
            .pipe(
                map(userList => {
                    if (!userList.length) throw Error("Conta não encontrada");
                    if (userList[0].password !== password) throw Error("Senha inválida");

                    localStorage.setItem('user', JSON.stringify(userList[0]));
                    this.userSubject.next(userList[0]);
                    return userList[0];
                })
            );
    }

}