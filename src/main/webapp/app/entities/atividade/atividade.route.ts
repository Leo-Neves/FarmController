import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Atividade } from 'app/shared/model/atividade.model';
import { AtividadeService } from './atividade.service';
import { AtividadeComponent } from './atividade.component';
import { AtividadeDetailComponent } from './atividade-detail.component';
import { AtividadeUpdateComponent } from './atividade-update.component';
import { AtividadeDeletePopupComponent } from './atividade-delete-dialog.component';
import { IAtividade } from 'app/shared/model/atividade.model';

@Injectable({ providedIn: 'root' })
export class AtividadeResolve implements Resolve<IAtividade> {
    constructor(private service: AtividadeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((atividade: HttpResponse<Atividade>) => atividade.body));
        }
        return of(new Atividade());
    }
}

export const atividadeRoute: Routes = [
    {
        path: 'atividade',
        component: AtividadeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.atividade.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'atividade/:id/view',
        component: AtividadeDetailComponent,
        resolve: {
            atividade: AtividadeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.atividade.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'atividade/new',
        component: AtividadeUpdateComponent,
        resolve: {
            atividade: AtividadeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.atividade.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'atividade/:id/edit',
        component: AtividadeUpdateComponent,
        resolve: {
            atividade: AtividadeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.atividade.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const atividadePopupRoute: Routes = [
    {
        path: 'atividade/:id/delete',
        component: AtividadeDeletePopupComponent,
        resolve: {
            atividade: AtividadeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmControllerApp.atividade.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
