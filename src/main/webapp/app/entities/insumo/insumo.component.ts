import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IInsumo } from 'app/shared/model/insumo.model';
import { Principal } from 'app/core';
import { InsumoService } from './insumo.service';

@Component({
    selector: 'jhi-insumo',
    templateUrl: './insumo.component.html'
})
export class InsumoComponent implements OnInit, OnDestroy {
    insumos: IInsumo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private insumoService: InsumoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.insumoService.query().subscribe(
            (res: HttpResponse<IInsumo[]>) => {
                this.insumos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInInsumos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IInsumo) {
        return item.id;
    }

    registerChangeInInsumos() {
        this.eventSubscriber = this.eventManager.subscribe('insumoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
