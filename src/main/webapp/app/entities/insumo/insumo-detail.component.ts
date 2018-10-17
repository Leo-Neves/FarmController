import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInsumo } from 'app/shared/model/insumo.model';

@Component({
    selector: 'jhi-insumo-detail',
    templateUrl: './insumo-detail.component.html'
})
export class InsumoDetailComponent implements OnInit {
    insumo: IInsumo;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ insumo }) => {
            this.insumo = insumo;
        });
    }

    previousState() {
        window.history.back();
    }
}
