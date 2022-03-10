import { StorageService } from './../storage/storage.service';
import { IAccountUser } from '../../interfaces/account.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthSession } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authSubject = new BehaviorSubject<AuthSession>(this.storageService.getStorage("PAYFRIENDS.user_access"));
  public authState$ = this.authSubject.asObservable();

  constructor(private readonly http: HttpClient, private readonly storageService: StorageService) { }

  login(email: string, password: string): Observable<IAccountUser> {
    const params = new HttpParams().appendAll({email, password});
    return this.http.get<IAccountUser[]>(`${environment.api}/account`, { params }).pipe(map((response: IAccountUser[]) => {
      
      this.setSession(new AuthSession({usr: response[0]}));
      return response ? response[0] : null;
    }))
  }

  get isLoggedIn() {    
    return (this.storageService.getStorage("PAYFRIENDS.user_access")) ? true : false;
  }

  logout() {
    this.storageService.clearStorage();
    this.setSession(null);
  }

  private setSession(user: AuthSession) {
    this.storageService.setStorage("PAYFRIENDS.user_access", user);
    this.authSubject.next(user);
  }
}
