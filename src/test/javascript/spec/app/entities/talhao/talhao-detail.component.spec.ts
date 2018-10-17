/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FarmControllerTestModule } from '../../../test.module';
import { TalhaoDetailComponent } from 'app/entities/talhao/talhao-detail.component';
import { Talhao } from 'app/shared/model/talhao.model';

describe('Component Tests', () => {
    describe('Talhao Management Detail Component', () => {
        let comp: TalhaoDetailComponent;
        let fixture: ComponentFixture<TalhaoDetailComponent>;
        const route = ({ data: of({ talhao: new Talhao('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [TalhaoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TalhaoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TalhaoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.talhao).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
