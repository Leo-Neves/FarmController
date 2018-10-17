import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Venda } from 'app/shared/model/venda.model';
import { VendaService } from './venda.service';
import { VendaComponent } from './venda.component';
import { VendaDetailComponent } from './venda-detail.component';
import { VendaUpdateComponent } from './venda-update.component';
import { VendaDeletePopupComponent } from './venda-delete-dialog.component';
import { IVenda } from 'app/shared/model/venda.model';

@Injectable({ providedIn: 'root' })
export class VendaResolve implements Resolve<IVenda> {
    constructor(private service: VendaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((venda: HttpResponse<Venda>) => venda.body));
        }
        return of(new Venda());
    }
}

export const vendaRoute: Routes = [
    {
        path: 'venda',
        component: VendaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.venda.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'venda/:id/view',
        component: VendaDetailComponent,
        resolve: {
            venda: VendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.venda.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'venda/new',
        component: VendaUpdateComponent,
        resolve: {
            venda: VendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.venda.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'venda/:id/edit',
        component: VendaUpdateComponent,
        resolve: {
            venda: VendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.venda.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vendaPopupRoute: Routes = [
    {
        path: 'venda/:id/delete',
        component: VendaDeletePopupComponent,
        resolve: {
            venda: VendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.venda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
