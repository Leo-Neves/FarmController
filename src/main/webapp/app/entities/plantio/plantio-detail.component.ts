import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlantio } from 'app/shared/model/plantio.model';

@Component({
    selector: 'jhi-plantio-detail',
    templateUrl: './plantio-detail.component.html'
})
export class PlantioDetailComponent implements OnInit {
    plantio: IPlantio;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ plantio }) => {
            this.plantio = plantio;
        });
    }

    previousState() {
        window.history.back();
    }
}
