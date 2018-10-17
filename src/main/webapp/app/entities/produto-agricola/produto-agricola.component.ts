import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProdutoAgricola } from 'app/shared/model/produto-agricola.model';
import { Principal } from 'app/core';
import { ProdutoAgricolaService } from './produto-agricola.service';

@Component({
    selector: 'jhi-produto-agricola',
    templateUrl: './produto-agricola.component.html'
})
export class ProdutoAgricolaComponent implements OnInit, OnDestroy {
    produtoAgricolas: IProdutoAgricola[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private produtoAgricolaService: ProdutoAgricolaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.produtoAgricolaService.query().subscribe(
            (res: HttpResponse<IProdutoAgricola[]>) => {
                this.produtoAgricolas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProdutoAgricolas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProdutoAgricola) {
        return item.id;
    }

    registerChangeInProdutoAgricolas() {
        this.eventSubscriber = this.eventManager.subscribe('produtoAgricolaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
