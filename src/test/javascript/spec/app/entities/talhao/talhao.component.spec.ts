/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FarmControllerTestModule } from '../../../test.module';
import { TalhaoComponent } from 'app/entities/talhao/talhao.component';
import { TalhaoService } from 'app/entities/talhao/talhao.service';
import { Talhao } from 'app/shared/model/talhao.model';

describe('Component Tests', () => {
    describe('Talhao Management Component', () => {
        let comp: TalhaoComponent;
        let fixture: ComponentFixture<TalhaoComponent>;
        let service: TalhaoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [TalhaoComponent],
                providers: []
            })
                .overrideTemplate(TalhaoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TalhaoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TalhaoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Talhao('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.talhaos[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
