import { AlertService } from 'src/app/services/alert/alert.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiURL = environment.api;
    constructor(private http: HttpClient, private alertService: AlertService) {}

    login(email: string, password: string): Observable<User> {
        const params = new URLSearchParams({ email, password } as { [key: string]: string }).toString();
        return this.http.get<User[]>(`${this.apiURL}/account?${params}`).pipe(
            map((users: User[]) => {
                const user = users[0];

                if (!!user) {
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                    return user;
                }

                this.alertService.showDanger('Opa! Usuário ou senha incorretos.');
                return undefined;
            })
        );
    }
}
