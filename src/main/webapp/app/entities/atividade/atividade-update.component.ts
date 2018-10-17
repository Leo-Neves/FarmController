import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAtividade } from 'app/shared/model/atividade.model';
import { AtividadeService } from './atividade.service';

@Component({
    selector: 'jhi-atividade-update',
    templateUrl: './atividade-update.component.html'
})
export class AtividadeUpdateComponent implements OnInit {
    atividade: IAtividade;
    isSaving: boolean;

    constructor(private atividadeService: AtividadeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ atividade }) => {
            this.atividade = atividade;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.atividade.id !== undefined) {
            this.subscribeToSaveResponse(this.atividadeService.update(this.atividade));
        } else {
            this.subscribeToSaveResponse(this.atividadeService.create(this.atividade));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAtividade>>) {
        result.subscribe((res: HttpResponse<IAtividade>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
