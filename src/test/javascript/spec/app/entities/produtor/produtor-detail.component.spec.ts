/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FarmControllerTestModule } from '../../../test.module';
import { ProdutorDetailComponent } from 'app/entities/produtor/produtor-detail.component';
import { Produtor } from 'app/shared/model/produtor.model';

describe('Component Tests', () => {
    describe('Produtor Management Detail Component', () => {
        let comp: ProdutorDetailComponent;
        let fixture: ComponentFixture<ProdutorDetailComponent>;
        const route = ({ data: of({ produtor: new Produtor('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [ProdutorDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProdutorDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProdutorDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.produtor).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
