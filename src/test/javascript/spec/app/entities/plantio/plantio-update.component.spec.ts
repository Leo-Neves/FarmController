/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FarmControllerTestModule } from '../../../test.module';
import { PlantioUpdateComponent } from 'app/entities/plantio/plantio-update.component';
import { PlantioService } from 'app/entities/plantio/plantio.service';
import { Plantio } from 'app/shared/model/plantio.model';

describe('Component Tests', () => {
    describe('Plantio Management Update Component', () => {
        let comp: PlantioUpdateComponent;
        let fixture: ComponentFixture<PlantioUpdateComponent>;
        let service: PlantioService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [PlantioUpdateComponent]
            })
                .overrideTemplate(PlantioUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PlantioUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlantioService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Plantio('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.plantio = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Plantio();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.plantio = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
