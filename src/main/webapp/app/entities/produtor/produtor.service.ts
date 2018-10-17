import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProdutor } from 'app/shared/model/produtor.model';

type EntityResponseType = HttpResponse<IProdutor>;
type EntityArrayResponseType = HttpResponse<IProdutor[]>;

@Injectable({ providedIn: 'root' })
export class ProdutorService {
    public resourceUrl = SERVER_API_URL + 'api/produtors';

    constructor(private http: HttpClient) {}

    create(produtor: IProdutor): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(produtor);
        return this.http
            .post<IProdutor>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(produtor: IProdutor): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(produtor);
        return this.http
            .put<IProdutor>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IProdutor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IProdutor[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(produtor: IProdutor): IProdutor {
        const copy: IProdutor = Object.assign({}, produtor, {
            dataNascimento:
                produtor.dataNascimento != null && produtor.dataNascimento.isValid() ? produtor.dataNascimento.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dataNascimento = res.body.dataNascimento != null ? moment(res.body.dataNascimento) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((produtor: IProdutor) => {
            produtor.dataNascimento = produtor.dataNascimento != null ? moment(produtor.dataNascimento) : null;
        });
        return res;
    }
}
