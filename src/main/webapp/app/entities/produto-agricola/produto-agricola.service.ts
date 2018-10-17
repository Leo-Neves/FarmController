import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProdutoAgricola } from 'app/shared/model/produto-agricola.model';

type EntityResponseType = HttpResponse<IProdutoAgricola>;
type EntityArrayResponseType = HttpResponse<IProdutoAgricola[]>;

@Injectable({ providedIn: 'root' })
export class ProdutoAgricolaService {
    public resourceUrl = SERVER_API_URL + 'api/produto-agricolas';

    constructor(private http: HttpClient) {}

    create(produtoAgricola: IProdutoAgricola): Observable<EntityResponseType> {
        return this.http.post<IProdutoAgricola>(this.resourceUrl, produtoAgricola, { observe: 'response' });
    }

    update(produtoAgricola: IProdutoAgricola): Observable<EntityResponseType> {
        return this.http.put<IProdutoAgricola>(this.resourceUrl, produtoAgricola, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IProdutoAgricola>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProdutoAgricola[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
