import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITalhao } from 'app/shared/model/talhao.model';

type EntityResponseType = HttpResponse<ITalhao>;
type EntityArrayResponseType = HttpResponse<ITalhao[]>;

@Injectable({ providedIn: 'root' })
export class TalhaoService {
    public resourceUrl = SERVER_API_URL + 'api/talhaos';

    constructor(private http: HttpClient) {}

    create(talhao: ITalhao): Observable<EntityResponseType> {
        return this.http.post<ITalhao>(this.resourceUrl, talhao, { observe: 'response' });
    }

    update(talhao: ITalhao): Observable<EntityResponseType> {
        return this.http.put<ITalhao>(this.resourceUrl, talhao, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ITalhao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITalhao[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
