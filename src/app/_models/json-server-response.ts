export class JsonServerResponse {
    totalCount: number;
    items: any;
    link: string;

    constructor(body, totalCount, link) {
        this.items = body;
        this.totalCount = parseInt(totalCount);
        this.link = link;
    }
}