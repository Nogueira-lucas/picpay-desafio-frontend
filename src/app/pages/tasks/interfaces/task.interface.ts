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
    name = '';
    username = '';
    title = '';
    value = '';
    date = '';
    image = '/assets/images/avatar_default.png';
    isPayed = false;
}

export enum TaskAction {
    GET_TASKS,
    SEARCH_TASKS
}

export interface TaskContract {
    action: TaskAction;
    data: any;
}
