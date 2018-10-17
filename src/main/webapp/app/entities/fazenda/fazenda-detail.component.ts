import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFazenda } from 'app/shared/model/fazenda.model';

@Component({
    selector: 'jhi-fazenda-detail',
    templateUrl: './fazenda-detail.component.html'
})
export class FazendaDetailComponent implements OnInit {
    fazenda: IFazenda;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fazenda }) => {
            this.fazenda = fazenda;
        });
    }

    previousState() {
        window.history.back();
    }
}
