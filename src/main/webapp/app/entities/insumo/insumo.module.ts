import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FarmControllerSharedModule } from 'app/shared';
import {
    InsumoComponent,
    InsumoDetailComponent,
    InsumoUpdateComponent,
    InsumoDeletePopupComponent,
    InsumoDeleteDialogComponent,
    insumoRoute,
    insumoPopupRoute
} from './';

const ENTITY_STATES = [...insumoRoute, ...insumoPopupRoute];

@NgModule({
    imports: [FarmControllerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [InsumoComponent, InsumoDetailComponent, InsumoUpdateComponent, InsumoDeleteDialogComponent, InsumoDeletePopupComponent],
    entryComponents: [InsumoComponent, InsumoUpdateComponent, InsumoDeleteDialogComponent, InsumoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FarmControllerInsumoModule {}
