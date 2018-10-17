import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISafra } from 'app/shared/model/safra.model';

@Component({
    selector: 'jhi-safra-detail',
    templateUrl: './safra-detail.component.html'
})
export class SafraDetailComponent implements OnInit {
    safra: ISafra;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ safra }) => {
            this.safra = safra;
        });
    }

    previousState() {
        window.history.back();
    }
}
