import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProdutor } from 'app/shared/model/produtor.model';
import { Principal } from 'app/core';
import { ProdutorService } from './produtor.service';

@Component({
    selector: 'jhi-produtor',
    templateUrl: './produtor.component.html'
})
export class ProdutorComponent implements OnInit, OnDestroy {
    produtors: IProdutor[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private produtorService: ProdutorService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.produtorService.query().subscribe(
            (res: HttpResponse<IProdutor[]>) => {
                this.produtors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProdutors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProdutor) {
        return item.id;
    }

    registerChangeInProdutors() {
        this.eventSubscriber = this.eventManager.subscribe('produtorListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
