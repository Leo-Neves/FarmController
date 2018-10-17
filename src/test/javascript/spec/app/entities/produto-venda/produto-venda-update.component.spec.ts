/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FarmControllerTestModule } from '../../../test.module';
import { ProdutoVendaUpdateComponent } from 'app/entities/produto-venda/produto-venda-update.component';
import { ProdutoVendaService } from 'app/entities/produto-venda/produto-venda.service';
import { ProdutoVenda } from 'app/shared/model/produto-venda.model';

describe('Component Tests', () => {
    describe('ProdutoVenda Management Update Component', () => {
        let comp: ProdutoVendaUpdateComponent;
        let fixture: ComponentFixture<ProdutoVendaUpdateComponent>;
        let service: ProdutoVendaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [ProdutoVendaUpdateComponent]
            })
                .overrideTemplate(ProdutoVendaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProdutoVendaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProdutoVendaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProdutoVenda('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.produtoVenda = entity;
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
                    const entity = new ProdutoVenda();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.produtoVenda = entity;
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
