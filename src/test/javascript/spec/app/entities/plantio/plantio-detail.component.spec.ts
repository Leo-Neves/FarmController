/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FarmControllerTestModule } from '../../../test.module';
import { PlantioDetailComponent } from 'app/entities/plantio/plantio-detail.component';
import { Plantio } from 'app/shared/model/plantio.model';

describe('Component Tests', () => {
    describe('Plantio Management Detail Component', () => {
        let comp: PlantioDetailComponent;
        let fixture: ComponentFixture<PlantioDetailComponent>;
        const route = ({ data: of({ plantio: new Plantio('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [PlantioDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PlantioDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PlantioDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.plantio).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
