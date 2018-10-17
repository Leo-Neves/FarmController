import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Safra } from 'app/shared/model/safra.model';
import { SafraService } from './safra.service';
import { SafraComponent } from './safra.component';
import { SafraDetailComponent } from './safra-detail.component';
import { SafraUpdateComponent } from './safra-update.component';
import { SafraDeletePopupComponent } from './safra-delete-dialog.component';
import { ISafra } from 'app/shared/model/safra.model';

@Injectable({ providedIn: 'root' })
export class SafraResolve implements Resolve<ISafra> {
    constructor(private service: SafraService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((safra: HttpResponse<Safra>) => safra.body));
        }
        return of(new Safra());
    }
}

export const safraRoute: Routes = [
    {
        path: 'safra',
        component: SafraComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.safra.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'safra/:id/view',
        component: SafraDetailComponent,
        resolve: {
            safra: SafraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.safra.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'safra/new',
        component: SafraUpdateComponent,
        resolve: {
            safra: SafraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.safra.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'safra/:id/edit',
        component: SafraUpdateComponent,
        resolve: {
            safra: SafraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.safra.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const safraPopupRoute: Routes = [
    {
        path: 'safra/:id/delete',
        component: SafraDeletePopupComponent,
        resolve: {
            safra: SafraResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.safra.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
