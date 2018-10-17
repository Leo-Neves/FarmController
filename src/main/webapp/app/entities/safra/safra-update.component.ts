import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { ISafra } from 'app/shared/model/safra.model';
import { SafraService } from './safra.service';
import { IPlantio } from 'app/shared/model/plantio.model';
import { PlantioService } from 'app/entities/plantio';

@Component({
    selector: 'jhi-safra-update',
    templateUrl: './safra-update.component.html'
})
export class SafraUpdateComponent implements OnInit {
    safra: ISafra;
    isSaving: boolean;

    plantios: IPlantio[];
    dataInicioDp: any;
    dataFimDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private safraService: SafraService,
        private plantioService: PlantioService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ safra }) => {
            this.safra = safra;
        });
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
        if (this.safra.id !== undefined) {
            this.subscribeToSaveResponse(this.safraService.update(this.safra));
        } else {
            this.subscribeToSaveResponse(this.safraService.create(this.safra));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISafra>>) {
        result.subscribe((res: HttpResponse<ISafra>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPlantioById(index: number, item: IPlantio) {
        return item.id;
    }
}
