import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IVenda } from 'app/shared/model/venda.model';
import { VendaService } from './venda.service';
import { IProdutoVenda } from 'app/shared/model/produto-venda.model';
import { ProdutoVendaService } from 'app/entities/produto-venda';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente';

@Component({
    selector: 'jhi-venda-update',
    templateUrl: './venda-update.component.html'
})
export class VendaUpdateComponent implements OnInit {
    venda: IVenda;
    isSaving: boolean;

    produtovendas: IProdutoVenda[];

    clientes: ICliente[];
    dataVendaDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private vendaService: VendaService,
        private produtoVendaService: ProdutoVendaService,
        private clienteService: ClienteService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ venda }) => {
            this.venda = venda;
        });
        this.produtoVendaService.query().subscribe(
            (res: HttpResponse<IProdutoVenda[]>) => {
                this.produtovendas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.clienteService.query().subscribe(
            (res: HttpResponse<ICliente[]>) => {
                this.clientes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.venda.id !== undefined) {
            this.subscribeToSaveResponse(this.vendaService.update(this.venda));
        } else {
            this.subscribeToSaveResponse(this.vendaService.create(this.venda));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVenda>>) {
        result.subscribe((res: HttpResponse<IVenda>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackProdutoVendaById(index: number, item: IProdutoVenda) {
        return item.id;
    }

    trackClienteById(index: number, item: ICliente) {
        return item.id;
    }
}
