import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "@src/app/models/user-model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  private accountUrl = "http://localhost:3000/account";

  constructor(private http: HttpClient) {}

  getUser(user: User): Observable<User> {
    return this.http.get<User>(this.accountUrl, {
      ...this.httpOptions,
      params: { email: user.email, password: user.password },
    });
  }
}
