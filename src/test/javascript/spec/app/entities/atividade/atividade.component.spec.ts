/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FarmControllerTestModule } from '../../../test.module';
import { AtividadeComponent } from 'app/entities/atividade/atividade.component';
import { AtividadeService } from 'app/entities/atividade/atividade.service';
import { Atividade } from 'app/shared/model/atividade.model';

describe('Component Tests', () => {
    describe('Atividade Management Component', () => {
        let comp: AtividadeComponent;
        let fixture: ComponentFixture<AtividadeComponent>;
        let service: AtividadeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [AtividadeComponent],
                providers: []
            })
                .overrideTemplate(AtividadeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AtividadeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AtividadeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Atividade('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.atividades[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
