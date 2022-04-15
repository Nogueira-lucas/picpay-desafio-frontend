import { Injectable } from '@angular/core';

import { ApiService } from '../api/api.service';

class User {
  email: string;
  senha: string;
}

@Injectable()
export class UserService {

  constructor(private apiServer: ApiService) { }

  isAUser(user: User){
    this.apiServer.getUserAccount(user)
    return this.apiServer.user
  }
}
