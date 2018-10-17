import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IProdutoVenda } from 'app/shared/model/produto-venda.model';
import { ProdutoVendaService } from './produto-venda.service';

@Component({
    selector: 'jhi-produto-venda-update',
    templateUrl: './produto-venda-update.component.html'
})
export class ProdutoVendaUpdateComponent implements OnInit {
    produtoVenda: IProdutoVenda;
    isSaving: boolean;

    constructor(private produtoVendaService: ProdutoVendaService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ produtoVenda }) => {
            this.produtoVenda = produtoVenda;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.produtoVenda.id !== undefined) {
            this.subscribeToSaveResponse(this.produtoVendaService.update(this.produtoVenda));
        } else {
            this.subscribeToSaveResponse(this.produtoVendaService.create(this.produtoVenda));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProdutoVenda>>) {
        result.subscribe((res: HttpResponse<IProdutoVenda>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
