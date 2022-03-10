import { IAccountUser } from '../interfaces/account.interface';
export class AuthSession {
    public usr: IAccountUser = null;

    constructor(init?: Partial<AuthSession>) {
        if(init) {
            Object.assign(this, {usr: new AuthUser(init.usr)});
        }
    }
}

export class AuthUser extends IAccountUser {

    constructor(init?: Partial<IAccountUser>) {
    super();
       this.avatar = init.avatar;
       this.email = init.email;
       this.name = init.name;
       this.id = init.id; 
    }
}