import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVenda } from 'app/shared/model/venda.model';
import { Principal } from 'app/core';
import { VendaService } from './venda.service';

@Component({
    selector: 'jhi-venda',
    templateUrl: './venda.component.html'
})
export class VendaComponent implements OnInit, OnDestroy {
    vendas: IVenda[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private vendaService: VendaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.vendaService.query().subscribe(
            (res: HttpResponse<IVenda[]>) => {
                this.vendas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVendas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVenda) {
        return item.id;
    }

    registerChangeInVendas() {
        this.eventSubscriber = this.eventManager.subscribe('vendaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
