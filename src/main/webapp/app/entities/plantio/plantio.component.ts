import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPlantio } from 'app/shared/model/plantio.model';
import { Principal } from 'app/core';
import { PlantioService } from './plantio.service';

@Component({
    selector: 'jhi-plantio',
    templateUrl: './plantio.component.html'
})
export class PlantioComponent implements OnInit, OnDestroy {
    plantios: IPlantio[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private plantioService: PlantioService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.plantioService.query().subscribe(
            (res: HttpResponse<IPlantio[]>) => {
                this.plantios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPlantios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPlantio) {
        return item.id;
    }

    registerChangeInPlantios() {
        this.eventSubscriber = this.eventManager.subscribe('plantioListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
