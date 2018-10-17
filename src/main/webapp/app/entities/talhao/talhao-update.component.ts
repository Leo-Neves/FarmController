import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITalhao } from 'app/shared/model/talhao.model';
import { TalhaoService } from './talhao.service';
import { IFazenda } from 'app/shared/model/fazenda.model';
import { FazendaService } from 'app/entities/fazenda';

@Component({
    selector: 'jhi-talhao-update',
    templateUrl: './talhao-update.component.html'
})
export class TalhaoUpdateComponent implements OnInit {
    talhao: ITalhao;
    isSaving: boolean;

    fazendas: IFazenda[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private talhaoService: TalhaoService,
        private fazendaService: FazendaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ talhao }) => {
            this.talhao = talhao;
        });
        this.fazendaService.query().subscribe(
            (res: HttpResponse<IFazenda[]>) => {
                this.fazendas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.talhao.id !== undefined) {
            this.subscribeToSaveResponse(this.talhaoService.update(this.talhao));
        } else {
            this.subscribeToSaveResponse(this.talhaoService.create(this.talhao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITalhao>>) {
        result.subscribe((res: HttpResponse<ITalhao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackFazendaById(index: number, item: IFazenda) {
        return item.id;
    }
}
