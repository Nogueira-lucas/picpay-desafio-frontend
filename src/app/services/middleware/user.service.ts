import { Injectable } from '@angular/core';

import { ApiService } from '../api/api.service';

class User {
  email: string;
  senha: string;
}

@Injectable()
export class UserService {

  constructor(private apiServer: ApiService) { }

  async isAUser(user: User){
    const { data } = await this.apiServer.userAccount(user)
    return data.length > 0
  }
}
