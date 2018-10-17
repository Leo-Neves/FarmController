/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FarmControllerTestModule } from '../../../test.module';
import { FazendaDetailComponent } from 'app/entities/fazenda/fazenda-detail.component';
import { Fazenda } from 'app/shared/model/fazenda.model';

describe('Component Tests', () => {
    describe('Fazenda Management Detail Component', () => {
        let comp: FazendaDetailComponent;
        let fixture: ComponentFixture<FazendaDetailComponent>;
        const route = ({ data: of({ fazenda: new Fazenda('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [FazendaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FazendaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FazendaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.fazenda).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
