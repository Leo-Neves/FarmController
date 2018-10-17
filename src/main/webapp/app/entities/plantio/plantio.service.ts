import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPlantio } from 'app/shared/model/plantio.model';

type EntityResponseType = HttpResponse<IPlantio>;
type EntityArrayResponseType = HttpResponse<IPlantio[]>;

@Injectable({ providedIn: 'root' })
export class PlantioService {
    public resourceUrl = SERVER_API_URL + 'api/plantios';

    constructor(private http: HttpClient) {}

    create(plantio: IPlantio): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(plantio);
        return this.http
            .post<IPlantio>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(plantio: IPlantio): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(plantio);
        return this.http
            .put<IPlantio>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IPlantio>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPlantio[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(plantio: IPlantio): IPlantio {
        const copy: IPlantio = Object.assign({}, plantio, {
            dataPlantio: plantio.dataPlantio != null && plantio.dataPlantio.isValid() ? plantio.dataPlantio.format(DATE_FORMAT) : null,
            dataPrevisaoColheita:
                plantio.dataPrevisaoColheita != null && plantio.dataPrevisaoColheita.isValid()
                    ? plantio.dataPrevisaoColheita.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dataPlantio = res.body.dataPlantio != null ? moment(res.body.dataPlantio) : null;
        res.body.dataPrevisaoColheita = res.body.dataPrevisaoColheita != null ? moment(res.body.dataPrevisaoColheita) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((plantio: IPlantio) => {
            plantio.dataPlantio = plantio.dataPlantio != null ? moment(plantio.dataPlantio) : null;
            plantio.dataPrevisaoColheita = plantio.dataPrevisaoColheita != null ? moment(plantio.dataPrevisaoColheita) : null;
        });
        return res;
    }
}
