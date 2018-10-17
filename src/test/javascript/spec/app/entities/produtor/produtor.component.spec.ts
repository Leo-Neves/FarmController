/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FarmControllerTestModule } from '../../../test.module';
import { ProdutorComponent } from 'app/entities/produtor/produtor.component';
import { ProdutorService } from 'app/entities/produtor/produtor.service';
import { Produtor } from 'app/shared/model/produtor.model';

describe('Component Tests', () => {
    describe('Produtor Management Component', () => {
        let comp: ProdutorComponent;
        let fixture: ComponentFixture<ProdutorComponent>;
        let service: ProdutorService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [ProdutorComponent],
                providers: []
            })
                .overrideTemplate(ProdutorComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProdutorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProdutorService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Produtor('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.produtors[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
