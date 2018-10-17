import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IColheita } from 'app/shared/model/colheita.model';
import { ColheitaService } from './colheita.service';
import { IProdutoAgricola } from 'app/shared/model/produto-agricola.model';
import { ProdutoAgricolaService } from 'app/entities/produto-agricola';
import { IPlantio } from 'app/shared/model/plantio.model';
import { PlantioService } from 'app/entities/plantio';

@Component({
    selector: 'jhi-colheita-update',
    templateUrl: './colheita-update.component.html'
})
export class ColheitaUpdateComponent implements OnInit {
    colheita: IColheita;
    isSaving: boolean;

    produtoagricolas: IProdutoAgricola[];

    plantios: IPlantio[];
    dataColheitaDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private colheitaService: ColheitaService,
        private produtoAgricolaService: ProdutoAgricolaService,
        private plantioService: PlantioService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ colheita }) => {
            this.colheita = colheita;
        });
        this.produtoAgricolaService.query({ filter: 'colheita-is-null' }).subscribe(
            (res: HttpResponse<IProdutoAgricola[]>) => {
                if (!this.colheita.produtoAgricola || !this.colheita.produtoAgricola.id) {
                    this.produtoagricolas = res.body;
                } else {
                    this.produtoAgricolaService.find(this.colheita.produtoAgricola.id).subscribe(
                        (subRes: HttpResponse<IProdutoAgricola>) => {
                            this.produtoagricolas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.plantioService.query().subscribe(
            (res: HttpResponse<IPlantio[]>) => {
                this.plantios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.colheita.id !== undefined) {
            this.subscribeToSaveResponse(this.colheitaService.update(this.colheita));
        } else {
            this.subscribeToSaveResponse(this.colheitaService.create(this.colheita));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IColheita>>) {
        result.subscribe((res: HttpResponse<IColheita>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProdutoAgricolaById(index: number, item: IProdutoAgricola) {
        return item.id;
    }

    trackPlantioById(index: number, item: IPlantio) {
        return item.id;
    }
}
