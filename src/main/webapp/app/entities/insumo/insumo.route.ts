import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Insumo } from 'app/shared/model/insumo.model';
import { InsumoService } from './insumo.service';
import { InsumoComponent } from './insumo.component';
import { InsumoDetailComponent } from './insumo-detail.component';
import { InsumoUpdateComponent } from './insumo-update.component';
import { InsumoDeletePopupComponent } from './insumo-delete-dialog.component';
import { IInsumo } from 'app/shared/model/insumo.model';

@Injectable({ providedIn: 'root' })
export class InsumoResolve implements Resolve<IInsumo> {
    constructor(private service: InsumoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((insumo: HttpResponse<Insumo>) => insumo.body));
        }
        return of(new Insumo());
    }
}

export const insumoRoute: Routes = [
    {
        path: 'insumo',
        component: InsumoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.insumo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'insumo/:id/view',
        component: InsumoDetailComponent,
        resolve: {
            insumo: InsumoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.insumo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'insumo/new',
        component: InsumoUpdateComponent,
        resolve: {
            insumo: InsumoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.insumo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'insumo/:id/edit',
        component: InsumoUpdateComponent,
        resolve: {
            insumo: InsumoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.insumo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const insumoPopupRoute: Routes = [
    {
        path: 'insumo/:id/delete',
        component: InsumoDeletePopupComponent,
        resolve: {
            insumo: InsumoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.insumo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
