import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITalhao } from 'app/shared/model/talhao.model';

@Component({
    selector: 'jhi-talhao-detail',
    templateUrl: './talhao-detail.component.html'
})
export class TalhaoDetailComponent implements OnInit {
    talhao: ITalhao;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ talhao }) => {
            this.talhao = talhao;
        });
    }

    previousState() {
        window.history.back();
    }
}
