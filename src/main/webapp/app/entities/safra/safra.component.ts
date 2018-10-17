import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISafra } from 'app/shared/model/safra.model';
import { Principal } from 'app/core';
import { SafraService } from './safra.service';

@Component({
    selector: 'jhi-safra',
    templateUrl: './safra.component.html'
})
export class SafraComponent implements OnInit, OnDestroy {
    safras: ISafra[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private safraService: SafraService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.safraService.query().subscribe(
            (res: HttpResponse<ISafra[]>) => {
                this.safras = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSafras();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISafra) {
        return item.id;
    }

    registerChangeInSafras() {
        this.eventSubscriber = this.eventManager.subscribe('safraListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
