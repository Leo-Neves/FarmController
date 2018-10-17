import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FarmControllerSharedModule } from 'app/shared';
import {
    SafraComponent,
    SafraDetailComponent,
    SafraUpdateComponent,
    SafraDeletePopupComponent,
    SafraDeleteDialogComponent,
    safraRoute,
    safraPopupRoute
} from './';

const ENTITY_STATES = [...safraRoute, ...safraPopupRoute];

@NgModule({
    imports: [FarmControllerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [SafraComponent, SafraDetailComponent, SafraUpdateComponent, SafraDeleteDialogComponent, SafraDeletePopupComponent],
    entryComponents: [SafraComponent, SafraUpdateComponent, SafraDeleteDialogComponent, SafraDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FarmControllerSafraModule {}
