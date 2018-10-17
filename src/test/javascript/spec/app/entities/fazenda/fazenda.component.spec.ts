/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FarmControllerTestModule } from '../../../test.module';
import { FazendaComponent } from 'app/entities/fazenda/fazenda.component';
import { FazendaService } from 'app/entities/fazenda/fazenda.service';
import { Fazenda } from 'app/shared/model/fazenda.model';

describe('Component Tests', () => {
    describe('Fazenda Management Component', () => {
        let comp: FazendaComponent;
        let fixture: ComponentFixture<FazendaComponent>;
        let service: FazendaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [FazendaComponent],
                providers: []
            })
                .overrideTemplate(FazendaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FazendaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FazendaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Fazenda('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.fazendas[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
