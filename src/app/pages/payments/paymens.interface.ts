export interface PaymentInterface{
    pages: Array<number>,
    page: number
    numEndPage:number
    limit: number
    totalPages: number
    pageView: number
    sort: string
    order: string
    like: string
}