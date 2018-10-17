import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProdutoVenda } from 'app/shared/model/produto-venda.model';
import { Principal } from 'app/core';
import { ProdutoVendaService } from './produto-venda.service';

@Component({
    selector: 'jhi-produto-venda',
    templateUrl: './produto-venda.component.html'
})
export class ProdutoVendaComponent implements OnInit, OnDestroy {
    produtoVendas: IProdutoVenda[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private produtoVendaService: ProdutoVendaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.produtoVendaService.query().subscribe(
            (res: HttpResponse<IProdutoVenda[]>) => {
                this.produtoVendas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProdutoVendas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProdutoVenda) {
        return item.id;
    }

    registerChangeInProdutoVendas() {
        this.eventSubscriber = this.eventManager.subscribe('produtoVendaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
