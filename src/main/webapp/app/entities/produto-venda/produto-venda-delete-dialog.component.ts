import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProdutoVenda } from 'app/shared/model/produto-venda.model';
import { ProdutoVendaService } from './produto-venda.service';

@Component({
    selector: 'jhi-produto-venda-delete-dialog',
    templateUrl: './produto-venda-delete-dialog.component.html'
})
export class ProdutoVendaDeleteDialogComponent {
    produtoVenda: IProdutoVenda;

    constructor(
        private produtoVendaService: ProdutoVendaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.produtoVendaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'produtoVendaListModification',
                content: 'Deleted an produtoVenda'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-produto-venda-delete-popup',
    template: ''
})
export class ProdutoVendaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ produtoVenda }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProdutoVendaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.produtoVenda = produtoVenda;
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
