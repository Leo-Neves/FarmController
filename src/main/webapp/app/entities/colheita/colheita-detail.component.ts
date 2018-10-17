import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IColheita } from 'app/shared/model/colheita.model';

@Component({
    selector: 'jhi-colheita-detail',
    templateUrl: './colheita-detail.component.html'
})
export class ColheitaDetailComponent implements OnInit {
    colheita: IColheita;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ colheita }) => {
            this.colheita = colheita;
        });
    }

    previousState() {
        window.history.back();
    }
}
