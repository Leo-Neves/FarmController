/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FarmControllerTestModule } from '../../../test.module';
import { ProdutoAgricolaUpdateComponent } from 'app/entities/produto-agricola/produto-agricola-update.component';
import { ProdutoAgricolaService } from 'app/entities/produto-agricola/produto-agricola.service';
import { ProdutoAgricola } from 'app/shared/model/produto-agricola.model';

describe('Component Tests', () => {
    describe('ProdutoAgricola Management Update Component', () => {
        let comp: ProdutoAgricolaUpdateComponent;
        let fixture: ComponentFixture<ProdutoAgricolaUpdateComponent>;
        let service: ProdutoAgricolaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [ProdutoAgricolaUpdateComponent]
            })
                .overrideTemplate(ProdutoAgricolaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProdutoAgricolaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProdutoAgricolaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProdutoAgricola('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.produtoAgricola = entity;
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
                    const entity = new ProdutoAgricola();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.produtoAgricola = entity;
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
