import { Injectable } from '@angular/core'
import { JsonServerParams } from '../_models/json-server-params';
import { JsonServerResponse } from '../_models/json-server-response';

@Injectable({ providedIn: 'root' })
export class JsonServerProvider {

    makeParams(params: JsonServerParams): string {
        let urlParams = "?"
        urlParams += this.buildParams(params);
        urlParams += this.buildPagination(params);

        return urlParams;
    }

    makeResponse(response): JsonServerResponse {
        return new JsonServerResponse(
            response.body,
            response.headers.get('X-Total-Count'),
            response.headers.get('link')
        )
    }

    private buildParams(params) {
        let urlParams = "";

        if (params.user) {
            urlParams += 'name_like=' + params.user;
        }

        return urlParams;
    }

    private buildPagination(params) {
        return '&_page=' + params.page + '&_limit=' + params.limit;
    }

}