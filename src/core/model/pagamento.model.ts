export class PagamentoModel {
    id?: string;
    name: string;
    username: string;
    title: string;
    value: number;
    date: Date;
    image?: string;
    isPayed?: boolean;

    constructor(
        id: string,
        name: string,
        username: string,
        title: string,
        value: number,
        date: Date,
        image?: string,
        isPayed: boolean = false
    ) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.title = title;
        this.value = value;
        this.date = date;
        this.image = image;
        this.isPayed = isPayed;
    }
}

export class PagamentoInserirModel{
    id?: string;
    name: string;
    username: string;
    title: string;
    value: number;
    date: Date;
    image?: string;
    isPayed: boolean;

    constructor(
        name: string,
        username: string,
        title: string,
        value: number,
        date: Date,
        image?: string,
        isPayed: boolean = false
    ) {
        this.name = name;
        this.username = username;
        this.title = title;
        this.value = value;
        this.date = date;
        this.image = image;
        this.isPayed = isPayed;
    }
}