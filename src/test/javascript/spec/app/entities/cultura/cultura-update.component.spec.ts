/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FarmControllerTestModule } from '../../../test.module';
import { CulturaUpdateComponent } from 'app/entities/cultura/cultura-update.component';
import { CulturaService } from 'app/entities/cultura/cultura.service';
import { Cultura } from 'app/shared/model/cultura.model';

describe('Component Tests', () => {
    describe('Cultura Management Update Component', () => {
        let comp: CulturaUpdateComponent;
        let fixture: ComponentFixture<CulturaUpdateComponent>;
        let service: CulturaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [CulturaUpdateComponent]
            })
                .overrideTemplate(CulturaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CulturaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CulturaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Cultura('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cultura = entity;
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
                    const entity = new Cultura();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cultura = entity;
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
