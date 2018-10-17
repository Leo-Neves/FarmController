import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProdutoAgricola } from 'app/shared/model/produto-agricola.model';

@Component({
    selector: 'jhi-produto-agricola-detail',
    templateUrl: './produto-agricola-detail.component.html'
})
export class ProdutoAgricolaDetailComponent implements OnInit {
    produtoAgricola: IProdutoAgricola;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ produtoAgricola }) => {
            this.produtoAgricola = produtoAgricola;
        });
    }

    previousState() {
        window.history.back();
    }
}
