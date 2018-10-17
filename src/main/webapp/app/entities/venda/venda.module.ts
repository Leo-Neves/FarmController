import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FarmControllerSharedModule } from 'app/shared';
import {
    VendaComponent,
    VendaDetailComponent,
    VendaUpdateComponent,
    VendaDeletePopupComponent,
    VendaDeleteDialogComponent,
    vendaRoute,
    vendaPopupRoute
} from './';

const ENTITY_STATES = [...vendaRoute, ...vendaPopupRoute];

@NgModule({
    imports: [FarmControllerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [VendaComponent, VendaDetailComponent, VendaUpdateComponent, VendaDeleteDialogComponent, VendaDeletePopupComponent],
    entryComponents: [VendaComponent, VendaUpdateComponent, VendaDeleteDialogComponent, VendaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FarmControllerVendaModule {}
