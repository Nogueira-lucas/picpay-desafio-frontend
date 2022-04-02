import { Deserializable } from "./deserializable.model";

export class Task implements Deserializable<Task>{


    "id": number
    "name": string
    "username": string
    "title": string
    "value": number
    "date": Date
    "image": string
    "isPayed": boolean


    deserialize(input: any): Task {
        Object.assign(this, input);
        return this;
    }

}