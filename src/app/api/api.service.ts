import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

class User {
  email: string;
  senha: string;
}

@Injectable()
export class ApiService {

  user: User

  constructor(private http: HttpClient) { }

  getUserAccount(user: User){
    return this.http.get(`http://localhost:3000/account?senha=${user.senha}&email=${user.email}`)
  } 

  getAllTasks(){
    return this.http.get(`http://localhost:3000/tasks`)
  }

  getTasks(limit = 10, offset = 0, name = ''){
    return this.http.get(`http://localhost:3000/tasks?_limit=${limit}&_page=${offset}&name_like=${name}`, {
      observe: 'response'
    })
  } 
}

