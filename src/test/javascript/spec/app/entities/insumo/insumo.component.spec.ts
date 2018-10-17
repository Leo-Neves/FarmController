/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FarmControllerTestModule } from '../../../test.module';
import { InsumoComponent } from 'app/entities/insumo/insumo.component';
import { InsumoService } from 'app/entities/insumo/insumo.service';
import { Insumo } from 'app/shared/model/insumo.model';

describe('Component Tests', () => {
    describe('Insumo Management Component', () => {
        let comp: InsumoComponent;
        let fixture: ComponentFixture<InsumoComponent>;
        let service: InsumoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [InsumoComponent],
                providers: []
            })
                .overrideTemplate(InsumoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InsumoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InsumoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Insumo('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.insumos[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
