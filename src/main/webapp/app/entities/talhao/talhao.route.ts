import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Talhao } from 'app/shared/model/talhao.model';
import { TalhaoService } from './talhao.service';
import { TalhaoComponent } from './talhao.component';
import { TalhaoDetailComponent } from './talhao-detail.component';
import { TalhaoUpdateComponent } from './talhao-update.component';
import { TalhaoDeletePopupComponent } from './talhao-delete-dialog.component';
import { ITalhao } from 'app/shared/model/talhao.model';

@Injectable({ providedIn: 'root' })
export class TalhaoResolve implements Resolve<ITalhao> {
    constructor(private service: TalhaoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((talhao: HttpResponse<Talhao>) => talhao.body));
        }
        return of(new Talhao());
    }
}

export const talhaoRoute: Routes = [
    {
        path: 'talhao',
        component: TalhaoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.talhao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'talhao/:id/view',
        component: TalhaoDetailComponent,
        resolve: {
            talhao: TalhaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.talhao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'talhao/new',
        component: TalhaoUpdateComponent,
        resolve: {
            talhao: TalhaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.talhao.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'talhao/:id/edit',
        component: TalhaoUpdateComponent,
        resolve: {
            talhao: TalhaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.talhao.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const talhaoPopupRoute: Routes = [
    {
        path: 'talhao/:id/delete',
        component: TalhaoDeletePopupComponent,
        resolve: {
            talhao: TalhaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.talhao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
