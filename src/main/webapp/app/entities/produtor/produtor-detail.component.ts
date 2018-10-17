import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProdutor } from 'app/shared/model/produtor.model';

@Component({
    selector: 'jhi-produtor-detail',
    templateUrl: './produtor-detail.component.html'
})
export class ProdutorDetailComponent implements OnInit {
    produtor: IProdutor;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ produtor }) => {
            this.produtor = produtor;
        });
    }

    previousState() {
        window.history.back();
    }
}
