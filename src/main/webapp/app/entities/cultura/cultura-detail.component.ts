import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICultura } from 'app/shared/model/cultura.model';

@Component({
    selector: 'jhi-cultura-detail',
    templateUrl: './cultura-detail.component.html'
})
export class CulturaDetailComponent implements OnInit {
    cultura: ICultura;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cultura }) => {
            this.cultura = cultura;
        });
    }

    previousState() {
        window.history.back();
    }
}
