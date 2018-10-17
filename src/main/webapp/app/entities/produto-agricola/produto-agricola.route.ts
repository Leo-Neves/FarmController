import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProdutoAgricola } from 'app/shared/model/produto-agricola.model';
import { ProdutoAgricolaService } from './produto-agricola.service';
import { ProdutoAgricolaComponent } from './produto-agricola.component';
import { ProdutoAgricolaDetailComponent } from './produto-agricola-detail.component';
import { ProdutoAgricolaUpdateComponent } from './produto-agricola-update.component';
import { ProdutoAgricolaDeletePopupComponent } from './produto-agricola-delete-dialog.component';
import { IProdutoAgricola } from 'app/shared/model/produto-agricola.model';

@Injectable({ providedIn: 'root' })
export class ProdutoAgricolaResolve implements Resolve<IProdutoAgricola> {
    constructor(private service: ProdutoAgricolaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((produtoAgricola: HttpResponse<ProdutoAgricola>) => produtoAgricola.body));
        }
        return of(new ProdutoAgricola());
    }
}

export const produtoAgricolaRoute: Routes = [
    {
        path: 'produto-agricola',
        component: ProdutoAgricolaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.produtoAgricola.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'produto-agricola/:id/view',
        component: ProdutoAgricolaDetailComponent,
        resolve: {
            produtoAgricola: ProdutoAgricolaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.produtoAgricola.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'produto-agricola/new',
        component: ProdutoAgricolaUpdateComponent,
        resolve: {
            produtoAgricola: ProdutoAgricolaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.produtoAgricola.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'produto-agricola/:id/edit',
        component: ProdutoAgricolaUpdateComponent,
        resolve: {
            produtoAgricola: ProdutoAgricolaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.produtoAgricola.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const produtoAgricolaPopupRoute: Routes = [
    {
        path: 'produto-agricola/:id/delete',
        component: ProdutoAgricolaDeletePopupComponent,
        resolve: {
            produtoAgricola: ProdutoAgricolaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.produtoAgricola.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
