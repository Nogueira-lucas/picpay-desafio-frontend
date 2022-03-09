export interface ITask {
    id: number;
    name: string;
    username: string;
    title: string;
    value: string;
    date: string;
    image: string;
    isPayed: boolean;
}

export class Task {
    id: number;
    name: string = '';
    username: string = '';
    title: string = '';
    value: string = '';
    date: string = '';
    image: string = '/assets/images/avatar_default.png';
    isPayed: boolean = false;
}