import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IColheita } from 'app/shared/model/colheita.model';

type EntityResponseType = HttpResponse<IColheita>;
type EntityArrayResponseType = HttpResponse<IColheita[]>;

@Injectable({ providedIn: 'root' })
export class ColheitaService {
    public resourceUrl = SERVER_API_URL + 'api/colheitas';

    constructor(private http: HttpClient) {}

    create(colheita: IColheita): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(colheita);
        return this.http
            .post<IColheita>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(colheita: IColheita): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(colheita);
        return this.http
            .put<IColheita>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IColheita>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IColheita[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(colheita: IColheita): IColheita {
        const copy: IColheita = Object.assign({}, colheita, {
            dataColheita:
                colheita.dataColheita != null && colheita.dataColheita.isValid() ? colheita.dataColheita.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dataColheita = res.body.dataColheita != null ? moment(res.body.dataColheita) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((colheita: IColheita) => {
            colheita.dataColheita = colheita.dataColheita != null ? moment(colheita.dataColheita) : null;
        });
        return res;
    }
}
