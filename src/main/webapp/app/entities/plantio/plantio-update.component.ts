import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IPlantio } from 'app/shared/model/plantio.model';
import { PlantioService } from './plantio.service';
import { ITalhao } from 'app/shared/model/talhao.model';
import { TalhaoService } from 'app/entities/talhao';
import { ICultura } from 'app/shared/model/cultura.model';
import { CulturaService } from 'app/entities/cultura';
import { IColheita } from 'app/shared/model/colheita.model';
import { ColheitaService } from 'app/entities/colheita';
import { IInsumo } from 'app/shared/model/insumo.model';
import { InsumoService } from 'app/entities/insumo';
import { IAtividade } from 'app/shared/model/atividade.model';
import { AtividadeService } from 'app/entities/atividade';

@Component({
    selector: 'jhi-plantio-update',
    templateUrl: './plantio-update.component.html'
})
export class PlantioUpdateComponent implements OnInit {
    plantio: IPlantio;
    isSaving: boolean;

    talhaos: ITalhao[];

    culturas: ICultura[];

    colheitas: IColheita[];

    insumos: IInsumo[];

    atividades: IAtividade[];
    dataPlantioDp: any;
    dataPrevisaoColheitaDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private plantioService: PlantioService,
        private talhaoService: TalhaoService,
        private culturaService: CulturaService,
        private colheitaService: ColheitaService,
        private insumoService: InsumoService,
        private atividadeService: AtividadeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ plantio }) => {
            this.plantio = plantio;
        });
        this.talhaoService.query().subscribe(
            (res: HttpResponse<ITalhao[]>) => {
                this.talhaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.culturaService.query().subscribe(
            (res: HttpResponse<ICultura[]>) => {
                this.culturas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.colheitaService.query({ filter: 'plantio-is-null' }).subscribe(
            (res: HttpResponse<IColheita[]>) => {
                if (!this.plantio.colheita || !this.plantio.colheita.id) {
                    this.colheitas = res.body;
                } else {
                    this.colheitaService.find(this.plantio.colheita.id).subscribe(
                        (subRes: HttpResponse<IColheita>) => {
                            this.colheitas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.insumoService.query().subscribe(
            (res: HttpResponse<IInsumo[]>) => {
                this.insumos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.atividadeService.query().subscribe(
            (res: HttpResponse<IAtividade[]>) => {
                this.atividades = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.plantio.id !== undefined) {
            this.subscribeToSaveResponse(this.plantioService.update(this.plantio));
        } else {
            this.subscribeToSaveResponse(this.plantioService.create(this.plantio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPlantio>>) {
        result.subscribe((res: HttpResponse<IPlantio>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTalhaoById(index: number, item: ITalhao) {
        return item.id;
    }

    trackCulturaById(index: number, item: ICultura) {
        return item.id;
    }

    trackColheitaById(index: number, item: IColheita) {
        return item.id;
    }

    trackInsumoById(index: number, item: IInsumo) {
        return item.id;
    }

    trackAtividadeById(index: number, item: IAtividade) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
