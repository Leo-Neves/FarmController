import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Produtor } from 'app/shared/model/produtor.model';
import { ProdutorService } from './produtor.service';
import { ProdutorComponent } from './produtor.component';
import { ProdutorDetailComponent } from './produtor-detail.component';
import { ProdutorUpdateComponent } from './produtor-update.component';
import { ProdutorDeletePopupComponent } from './produtor-delete-dialog.component';
import { IProdutor } from 'app/shared/model/produtor.model';

@Injectable({ providedIn: 'root' })
export class ProdutorResolve implements Resolve<IProdutor> {
    constructor(private service: ProdutorService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((produtor: HttpResponse<Produtor>) => produtor.body));
        }
        return of(new Produtor());
    }
}

export const produtorRoute: Routes = [
    {
        path: 'produtor',
        component: ProdutorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.produtor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'produtor/:id/view',
        component: ProdutorDetailComponent,
        resolve: {
            produtor: ProdutorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.produtor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'produtor/new',
        component: ProdutorUpdateComponent,
        resolve: {
            produtor: ProdutorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.produtor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'produtor/:id/edit',
        component: ProdutorUpdateComponent,
        resolve: {
            produtor: ProdutorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.produtor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const produtorPopupRoute: Routes = [
    {
        path: 'produtor/:id/delete',
        component: ProdutorDeletePopupComponent,
        resolve: {
            produtor: ProdutorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.produtor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
