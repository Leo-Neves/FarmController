/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FarmControllerTestModule } from '../../../test.module';
import { ColheitaComponent } from 'app/entities/colheita/colheita.component';
import { ColheitaService } from 'app/entities/colheita/colheita.service';
import { Colheita } from 'app/shared/model/colheita.model';

describe('Component Tests', () => {
    describe('Colheita Management Component', () => {
        let comp: ColheitaComponent;
        let fixture: ComponentFixture<ColheitaComponent>;
        let service: ColheitaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [ColheitaComponent],
                providers: []
            })
                .overrideTemplate(ColheitaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ColheitaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColheitaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Colheita('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.colheitas[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
