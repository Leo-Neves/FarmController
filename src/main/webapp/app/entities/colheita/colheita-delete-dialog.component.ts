import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IColheita } from 'app/shared/model/colheita.model';
import { ColheitaService } from './colheita.service';

@Component({
    selector: 'jhi-colheita-delete-dialog',
    templateUrl: './colheita-delete-dialog.component.html'
})
export class ColheitaDeleteDialogComponent {
    colheita: IColheita;

    constructor(private colheitaService: ColheitaService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.colheitaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'colheitaListModification',
                content: 'Deleted an colheita'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-colheita-delete-popup',
    template: ''
})
export class ColheitaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ colheita }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ColheitaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.colheita = colheita;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
