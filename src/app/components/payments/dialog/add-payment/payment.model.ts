export interface Payment {
    id?: number,
    name?: string,
    userName: string,
    title?: string,
    value: number,
    date: Date,
    image?: string,
    isPayed?: boolean
}