import { Deserializable } from './deserializable.model';

export class Account implements Deserializable<Account>{

    'id': number;
    'name': string;
    'email': string;
    'password': string;
    'token': string;

    deserialize(input: any): Account {
        Object.assign(this, input);
        return this;
    }

}
