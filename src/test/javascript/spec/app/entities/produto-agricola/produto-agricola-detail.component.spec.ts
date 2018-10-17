/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FarmControllerTestModule } from '../../../test.module';
import { ProdutoAgricolaDetailComponent } from 'app/entities/produto-agricola/produto-agricola-detail.component';
import { ProdutoAgricola } from 'app/shared/model/produto-agricola.model';

describe('Component Tests', () => {
    describe('ProdutoAgricola Management Detail Component', () => {
        let comp: ProdutoAgricolaDetailComponent;
        let fixture: ComponentFixture<ProdutoAgricolaDetailComponent>;
        const route = ({ data: of({ produtoAgricola: new ProdutoAgricola('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [ProdutoAgricolaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProdutoAgricolaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProdutoAgricolaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.produtoAgricola).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
