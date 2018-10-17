/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FarmControllerTestModule } from '../../../test.module';
import { InsumoDetailComponent } from 'app/entities/insumo/insumo-detail.component';
import { Insumo } from 'app/shared/model/insumo.model';

describe('Component Tests', () => {
    describe('Insumo Management Detail Component', () => {
        let comp: InsumoDetailComponent;
        let fixture: ComponentFixture<InsumoDetailComponent>;
        const route = ({ data: of({ insumo: new Insumo('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [InsumoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(InsumoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InsumoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.insumo).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
