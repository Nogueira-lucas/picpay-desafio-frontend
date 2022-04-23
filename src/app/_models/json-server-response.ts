export class JsonServerResponse {
    totalCount: number;
    items: any;
    link: any;

    constructor(body, totalCount, link) {
        this.items = body;
        this.totalCount = totalCount;
        this.link = link;
    }
}