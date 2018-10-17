import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISafra } from 'app/shared/model/safra.model';

type EntityResponseType = HttpResponse<ISafra>;
type EntityArrayResponseType = HttpResponse<ISafra[]>;

@Injectable({ providedIn: 'root' })
export class SafraService {
    public resourceUrl = SERVER_API_URL + 'api/safras';

    constructor(private http: HttpClient) {}

    create(safra: ISafra): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(safra);
        return this.http
            .post<ISafra>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(safra: ISafra): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(safra);
        return this.http
            .put<ISafra>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<ISafra>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISafra[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(safra: ISafra): ISafra {
        const copy: ISafra = Object.assign({}, safra, {
            dataInicio: safra.dataInicio != null && safra.dataInicio.isValid() ? safra.dataInicio.format(DATE_FORMAT) : null,
            dataFim: safra.dataFim != null && safra.dataFim.isValid() ? safra.dataFim.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dataInicio = res.body.dataInicio != null ? moment(res.body.dataInicio) : null;
        res.body.dataFim = res.body.dataFim != null ? moment(res.body.dataFim) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((safra: ISafra) => {
            safra.dataInicio = safra.dataInicio != null ? moment(safra.dataInicio) : null;
            safra.dataFim = safra.dataFim != null ? moment(safra.dataFim) : null;
        });
        return res;
    }
}
