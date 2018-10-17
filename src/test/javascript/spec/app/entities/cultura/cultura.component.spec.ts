/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FarmControllerTestModule } from '../../../test.module';
import { CulturaComponent } from 'app/entities/cultura/cultura.component';
import { CulturaService } from 'app/entities/cultura/cultura.service';
import { Cultura } from 'app/shared/model/cultura.model';

describe('Component Tests', () => {
    describe('Cultura Management Component', () => {
        let comp: CulturaComponent;
        let fixture: ComponentFixture<CulturaComponent>;
        let service: CulturaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [CulturaComponent],
                providers: []
            })
                .overrideTemplate(CulturaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CulturaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CulturaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Cultura('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.culturas[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
