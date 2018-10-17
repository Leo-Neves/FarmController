/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FarmControllerTestModule } from '../../../test.module';
import { PlantioComponent } from 'app/entities/plantio/plantio.component';
import { PlantioService } from 'app/entities/plantio/plantio.service';
import { Plantio } from 'app/shared/model/plantio.model';

describe('Component Tests', () => {
    describe('Plantio Management Component', () => {
        let comp: PlantioComponent;
        let fixture: ComponentFixture<PlantioComponent>;
        let service: PlantioService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [PlantioComponent],
                providers: []
            })
                .overrideTemplate(PlantioComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PlantioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlantioService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Plantio('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.plantios[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
