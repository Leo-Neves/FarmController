import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Colheita } from 'app/shared/model/colheita.model';
import { ColheitaService } from './colheita.service';
import { ColheitaComponent } from './colheita.component';
import { ColheitaDetailComponent } from './colheita-detail.component';
import { ColheitaUpdateComponent } from './colheita-update.component';
import { ColheitaDeletePopupComponent } from './colheita-delete-dialog.component';
import { IColheita } from 'app/shared/model/colheita.model';

@Injectable({ providedIn: 'root' })
export class ColheitaResolve implements Resolve<IColheita> {
    constructor(private service: ColheitaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((colheita: HttpResponse<Colheita>) => colheita.body));
        }
        return of(new Colheita());
    }
}

export const colheitaRoute: Routes = [
    {
        path: 'colheita',
        component: ColheitaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.colheita.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'colheita/:id/view',
        component: ColheitaDetailComponent,
        resolve: {
            colheita: ColheitaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.colheita.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'colheita/new',
        component: ColheitaUpdateComponent,
        resolve: {
            colheita: ColheitaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.colheita.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'colheita/:id/edit',
        component: ColheitaUpdateComponent,
        resolve: {
            colheita: ColheitaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.colheita.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const colheitaPopupRoute: Routes = [
    {
        path: 'colheita/:id/delete',
        component: ColheitaDeletePopupComponent,
        resolve: {
            colheita: ColheitaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.colheita.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
