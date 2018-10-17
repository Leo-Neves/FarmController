import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICultura } from 'app/shared/model/cultura.model';

type EntityResponseType = HttpResponse<ICultura>;
type EntityArrayResponseType = HttpResponse<ICultura[]>;

@Injectable({ providedIn: 'root' })
export class CulturaService {
    public resourceUrl = SERVER_API_URL + 'api/culturas';

    constructor(private http: HttpClient) {}

    create(cultura: ICultura): Observable<EntityResponseType> {
        return this.http.post<ICultura>(this.resourceUrl, cultura, { observe: 'response' });
    }

    update(cultura: ICultura): Observable<EntityResponseType> {
        return this.http.put<ICultura>(this.resourceUrl, cultura, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ICultura>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICultura[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
