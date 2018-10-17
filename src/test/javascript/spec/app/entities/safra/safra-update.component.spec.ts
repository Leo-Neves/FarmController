/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FarmControllerTestModule } from '../../../test.module';
import { SafraUpdateComponent } from 'app/entities/safra/safra-update.component';
import { SafraService } from 'app/entities/safra/safra.service';
import { Safra } from 'app/shared/model/safra.model';

describe('Component Tests', () => {
    describe('Safra Management Update Component', () => {
        let comp: SafraUpdateComponent;
        let fixture: ComponentFixture<SafraUpdateComponent>;
        let service: SafraService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [SafraUpdateComponent]
            })
                .overrideTemplate(SafraUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SafraUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SafraService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Safra('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.safra = entity;
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
                    const entity = new Safra();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.safra = entity;
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
