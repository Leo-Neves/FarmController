/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FarmControllerTestModule } from '../../../test.module';
import { ColheitaUpdateComponent } from 'app/entities/colheita/colheita-update.component';
import { ColheitaService } from 'app/entities/colheita/colheita.service';
import { Colheita } from 'app/shared/model/colheita.model';

describe('Component Tests', () => {
    describe('Colheita Management Update Component', () => {
        let comp: ColheitaUpdateComponent;
        let fixture: ComponentFixture<ColheitaUpdateComponent>;
        let service: ColheitaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [ColheitaUpdateComponent]
            })
                .overrideTemplate(ColheitaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ColheitaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColheitaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Colheita('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.colheita = entity;
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
                    const entity = new Colheita();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.colheita = entity;
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
