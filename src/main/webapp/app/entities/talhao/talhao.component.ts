import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITalhao } from 'app/shared/model/talhao.model';
import { Principal } from 'app/core';
import { TalhaoService } from './talhao.service';

@Component({
    selector: 'jhi-talhao',
    templateUrl: './talhao.component.html'
})
export class TalhaoComponent implements OnInit, OnDestroy {
    talhaos: ITalhao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private talhaoService: TalhaoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.talhaoService.query().subscribe(
            (res: HttpResponse<ITalhao[]>) => {
                this.talhaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTalhaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITalhao) {
        return item.id;
    }

    registerChangeInTalhaos() {
        this.eventSubscriber = this.eventManager.subscribe('talhaoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
