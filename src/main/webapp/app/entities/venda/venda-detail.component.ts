import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVenda } from 'app/shared/model/venda.model';

@Component({
    selector: 'jhi-venda-detail',
    templateUrl: './venda-detail.component.html'
})
export class VendaDetailComponent implements OnInit {
    venda: IVenda;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ venda }) => {
            this.venda = venda;
        });
    }

    previousState() {
        window.history.back();
    }
}
