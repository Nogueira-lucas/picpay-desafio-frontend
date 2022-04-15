import { Injectable } from '@angular/core';
import axios from 'axios';

class User {
  email: string;
  senha: string;
}

@Injectable()
export class ApiService {

  constructor() { }

  async userAccount(user: User){
    try {
      return await axios.get(`http://localhost:3000/account?senha=${user.senha}&email=${user.email}`);
    } catch (error) {
      console.error(error);
    }
  } 
}

