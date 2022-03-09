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
  paramRedirect = "/home/payments"
  paramLogin = "/login"

  setUserInStorage(user: User){
    this.user = user
    this.token = encrypt(JSON.stringify(user))
    localStorage.setItem('currentUser', this.token)
    
     
    this._router.navigate([this.paramRedirect])
  }
  
  logout() {
    this.user = null
    localStorage.clear()    
    this._router.navigate([this.paramLogin])
  }

  isLoggedIn(): boolean {   
    const data = localStorage.getItem('currentUser')
    if (!data) 
      this.logout()
    try {      
      this.user = JSON.parse(decrypt(data))
    } catch (error) {      
      this.logout()
    } 
    return true
  }

  login(email: string, password: string) {
    const params = `account?email=${email}&password=${password}`
    return this.get(params).subscribe(
      (data) =>{
        if(data?.body && data?.body.length === 1)
          this.setUserInStorage(data.body[0])
        else
          this.alert.set("E-mail ou Senha estão invalidos")
      }
    )       
  }
}