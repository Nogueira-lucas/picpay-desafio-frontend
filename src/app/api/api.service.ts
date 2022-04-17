import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

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

  getTasks(limit = 50, offset = 1, name = ''){
    return this.http.get(`http://localhost:3000/tasks?_limit=${limit}&_page=${offset}&name_like=${name}&_sort=id&_order=desc`, {
      observe: 'response'
    })
  } 

  getTasksWithId(id: number){
    return this.http.get(`http://localhost:3000/tasks?id=${id}`)
  } 

  postTasks(body){
    return this.http.post(`http://localhost:3000/tasks`, body)
  } 
  
  deleteTasks(id: string){
    return this.http.delete(`http://localhost:3000/tasks/${id}`)
  } 

  editTasks(id, body){
    return this.http.put(`http://localhost:3000/tasks/${id}`, body)
  } 
}
