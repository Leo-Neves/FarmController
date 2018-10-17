import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICultura } from 'app/shared/model/cultura.model';
import { Principal } from 'app/core';
import { CulturaService } from './cultura.service';

@Component({
    selector: 'jhi-cultura',
    templateUrl: './cultura.component.html'
})
export class CulturaComponent implements OnInit, OnDestroy {
    culturas: ICultura[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private culturaService: CulturaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.culturaService.query().subscribe(
            (res: HttpResponse<ICultura[]>) => {
                this.culturas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCulturas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICultura) {
        return item.id;
    }

    registerChangeInCulturas() {
        this.eventSubscriber = this.eventManager.subscribe('culturaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
