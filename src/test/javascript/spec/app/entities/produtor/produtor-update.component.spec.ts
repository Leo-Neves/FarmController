/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FarmControllerTestModule } from '../../../test.module';
import { ProdutorUpdateComponent } from 'app/entities/produtor/produtor-update.component';
import { ProdutorService } from 'app/entities/produtor/produtor.service';
import { Produtor } from 'app/shared/model/produtor.model';

describe('Component Tests', () => {
    describe('Produtor Management Update Component', () => {
        let comp: ProdutorUpdateComponent;
        let fixture: ComponentFixture<ProdutorUpdateComponent>;
        let service: ProdutorService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [ProdutorUpdateComponent]
            })
                .overrideTemplate(ProdutorUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProdutorUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProdutorService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Produtor('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.produtor = entity;
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
                    const entity = new Produtor();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.produtor = entity;
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
