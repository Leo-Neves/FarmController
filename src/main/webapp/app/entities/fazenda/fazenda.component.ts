import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFazenda } from 'app/shared/model/fazenda.model';
import { Principal } from 'app/core';
import { FazendaService } from './fazenda.service';

@Component({
    selector: 'jhi-fazenda',
    templateUrl: './fazenda.component.html'
})
export class FazendaComponent implements OnInit, OnDestroy {
    fazendas: IFazenda[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private fazendaService: FazendaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.fazendaService.query().subscribe(
            (res: HttpResponse<IFazenda[]>) => {
                this.fazendas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFazendas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFazenda) {
        return item.id;
    }

    registerChangeInFazendas() {
        this.eventSubscriber = this.eventManager.subscribe('fazendaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
