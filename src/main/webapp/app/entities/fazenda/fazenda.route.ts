import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Fazenda } from 'app/shared/model/fazenda.model';
import { FazendaService } from './fazenda.service';
import { FazendaComponent } from './fazenda.component';
import { FazendaDetailComponent } from './fazenda-detail.component';
import { FazendaUpdateComponent } from './fazenda-update.component';
import { FazendaDeletePopupComponent } from './fazenda-delete-dialog.component';
import { IFazenda } from 'app/shared/model/fazenda.model';

@Injectable({ providedIn: 'root' })
export class FazendaResolve implements Resolve<IFazenda> {
    constructor(private service: FazendaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((fazenda: HttpResponse<Fazenda>) => fazenda.body));
        }
        return of(new Fazenda());
    }
}

export const fazendaRoute: Routes = [
    {
        path: 'fazenda',
        component: FazendaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.fazenda.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fazenda/:id/view',
        component: FazendaDetailComponent,
        resolve: {
            fazenda: FazendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.fazenda.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fazenda/new',
        component: FazendaUpdateComponent,
        resolve: {
            fazenda: FazendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.fazenda.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fazenda/:id/edit',
        component: FazendaUpdateComponent,
        resolve: {
            fazenda: FazendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.fazenda.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fazendaPopupRoute: Routes = [
    {
        path: 'fazenda/:id/delete',
        component: FazendaDeletePopupComponent,
        resolve: {
            fazenda: FazendaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.fazenda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
