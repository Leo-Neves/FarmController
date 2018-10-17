/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FarmControllerTestModule } from '../../../test.module';
import { TalhaoUpdateComponent } from 'app/entities/talhao/talhao-update.component';
import { TalhaoService } from 'app/entities/talhao/talhao.service';
import { Talhao } from 'app/shared/model/talhao.model';

describe('Component Tests', () => {
    describe('Talhao Management Update Component', () => {
        let comp: TalhaoUpdateComponent;
        let fixture: ComponentFixture<TalhaoUpdateComponent>;
        let service: TalhaoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [TalhaoUpdateComponent]
            })
                .overrideTemplate(TalhaoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TalhaoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TalhaoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Talhao('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.talhao = entity;
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
                    const entity = new Talhao();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.talhao = entity;
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
