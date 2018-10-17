/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FarmControllerTestModule } from '../../../test.module';
import { ProdutoAgricolaComponent } from 'app/entities/produto-agricola/produto-agricola.component';
import { ProdutoAgricolaService } from 'app/entities/produto-agricola/produto-agricola.service';
import { ProdutoAgricola } from 'app/shared/model/produto-agricola.model';

describe('Component Tests', () => {
    describe('ProdutoAgricola Management Component', () => {
        let comp: ProdutoAgricolaComponent;
        let fixture: ComponentFixture<ProdutoAgricolaComponent>;
        let service: ProdutoAgricolaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [ProdutoAgricolaComponent],
                providers: []
            })
                .overrideTemplate(ProdutoAgricolaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProdutoAgricolaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProdutoAgricolaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ProdutoAgricola('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.produtoAgricolas[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
