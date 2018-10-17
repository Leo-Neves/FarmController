/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FarmControllerTestModule } from '../../../test.module';
import { InsumoUpdateComponent } from 'app/entities/insumo/insumo-update.component';
import { InsumoService } from 'app/entities/insumo/insumo.service';
import { Insumo } from 'app/shared/model/insumo.model';

describe('Component Tests', () => {
    describe('Insumo Management Update Component', () => {
        let comp: InsumoUpdateComponent;
        let fixture: ComponentFixture<InsumoUpdateComponent>;
        let service: InsumoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [InsumoUpdateComponent]
            })
                .overrideTemplate(InsumoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InsumoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InsumoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Insumo('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.insumo = entity;
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
                    const entity = new Insumo();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.insumo = entity;
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
