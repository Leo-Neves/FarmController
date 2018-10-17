import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProdutoVenda } from 'app/shared/model/produto-venda.model';

type EntityResponseType = HttpResponse<IProdutoVenda>;
type EntityArrayResponseType = HttpResponse<IProdutoVenda[]>;

@Injectable({ providedIn: 'root' })
export class ProdutoVendaService {
    public resourceUrl = SERVER_API_URL + 'api/produto-vendas';

    constructor(private http: HttpClient) {}

    create(produtoVenda: IProdutoVenda): Observable<EntityResponseType> {
        return this.http.post<IProdutoVenda>(this.resourceUrl, produtoVenda, { observe: 'response' });
    }

    update(produtoVenda: IProdutoVenda): Observable<EntityResponseType> {
        return this.http.put<IProdutoVenda>(this.resourceUrl, produtoVenda, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IProdutoVenda>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProdutoVenda[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
