import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IInsumo } from 'app/shared/model/insumo.model';
import { InsumoService } from './insumo.service';

@Component({
    selector: 'jhi-insumo-update',
    templateUrl: './insumo-update.component.html'
})
export class InsumoUpdateComponent implements OnInit {
    insumo: IInsumo;
    isSaving: boolean;

    constructor(private insumoService: InsumoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ insumo }) => {
            this.insumo = insumo;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.insumo.id !== undefined) {
            this.subscribeToSaveResponse(this.insumoService.update(this.insumo));
        } else {
            this.subscribeToSaveResponse(this.insumoService.create(this.insumo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IInsumo>>) {
        result.subscribe((res: HttpResponse<IInsumo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
