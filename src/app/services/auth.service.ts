import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';
import { RepositoryService } from './repository.service';
import { encrypt, decrypt } from 'src/app/shared/utils/crypto';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends RepositoryService {
  token: string
  user: User

  setUserInStorage(user: User){
    this.user = user
    this.token = encrypt(JSON.stringify(user))
    localStorage.setItem('currentUser', this.token)
  }
  
  logout() {
    this.user = null
    localStorage.clear()    
    this._router.navigate(['/login'])
  }

  isLoggedIn(): boolean {    
    const data = localStorage.getItem('currentUser')
    if (!data) 
      this.logout() 
    this.user = JSON.parse(decrypt(data))
    return true
  }

  login(email: string, password: string) {
    const params = `account?email=${email}&password=${password}`
    return this.get(params).subscribe(
      (data) =>{
        if(data && data.length === 1){
          this.setUserInStorage(data[0])
          this._router.navigate(['/payments'])
        }else
          this.alert.set("E-mail ou Senha estão invalidos")
      }
    )       
  }
}