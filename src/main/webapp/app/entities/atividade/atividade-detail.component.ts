import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAtividade } from 'app/shared/model/atividade.model';

@Component({
    selector: 'jhi-atividade-detail',
    templateUrl: './atividade-detail.component.html'
})
export class AtividadeDetailComponent implements OnInit {
    atividade: IAtividade;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ atividade }) => {
            this.atividade = atividade;
        });
    }

    previousState() {
        window.history.back();
    }
}
