/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FarmControllerTestModule } from '../../../test.module';
import { FazendaUpdateComponent } from 'app/entities/fazenda/fazenda-update.component';
import { FazendaService } from 'app/entities/fazenda/fazenda.service';
import { Fazenda } from 'app/shared/model/fazenda.model';

describe('Component Tests', () => {
    describe('Fazenda Management Update Component', () => {
        let comp: FazendaUpdateComponent;
        let fixture: ComponentFixture<FazendaUpdateComponent>;
        let service: FazendaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [FazendaUpdateComponent]
            })
                .overrideTemplate(FazendaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FazendaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FazendaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Fazenda('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fazenda = entity;
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
                    const entity = new Fazenda();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fazenda = entity;
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
