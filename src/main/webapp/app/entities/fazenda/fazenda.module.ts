import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FarmControllerSharedModule } from 'app/shared';
import {
    FazendaComponent,
    FazendaDetailComponent,
    FazendaUpdateComponent,
    FazendaDeletePopupComponent,
    FazendaDeleteDialogComponent,
    fazendaRoute,
    fazendaPopupRoute
} from './';

const ENTITY_STATES = [...fazendaRoute, ...fazendaPopupRoute];

@NgModule({
    imports: [FarmControllerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FazendaComponent,
        FazendaDetailComponent,
        FazendaUpdateComponent,
        FazendaDeleteDialogComponent,
        FazendaDeletePopupComponent
    ],
    entryComponents: [FazendaComponent, FazendaUpdateComponent, FazendaDeleteDialogComponent, FazendaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FarmControllerFazendaModule {}
