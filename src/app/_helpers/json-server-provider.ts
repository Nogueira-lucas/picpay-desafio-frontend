import { Injectable } from '@angular/core'
import { JsonServerParams } from '../_models/json-server-params';
import { JsonServerResponse } from '../_models/json-server-response';

@Injectable({ providedIn: 'root' })
export class JsonServerProvider {

    makeParams(params: JsonServerParams): string {
        let urlParams = '';

        urlParams += '?_page=' + params.page;
        urlParams += '&_limit=' + params.limit;

        return urlParams;
    }

    makeResponse(response): JsonServerResponse {
        return new JsonServerResponse(
            response.body,
            response.headers.get('X-Total-Count'),
            response.headers.get('link')
        )
    }

}