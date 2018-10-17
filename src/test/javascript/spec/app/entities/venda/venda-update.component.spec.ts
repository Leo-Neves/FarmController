/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FarmControllerTestModule } from '../../../test.module';
import { VendaUpdateComponent } from 'app/entities/venda/venda-update.component';
import { VendaService } from 'app/entities/venda/venda.service';
import { Venda } from 'app/shared/model/venda.model';

describe('Component Tests', () => {
    describe('Venda Management Update Component', () => {
        let comp: VendaUpdateComponent;
        let fixture: ComponentFixture<VendaUpdateComponent>;
        let service: VendaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [VendaUpdateComponent]
            })
                .overrideTemplate(VendaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VendaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VendaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Venda('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.venda = entity;
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
                    const entity = new Venda();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.venda = entity;
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
