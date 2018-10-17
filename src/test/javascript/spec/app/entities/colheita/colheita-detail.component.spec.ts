/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FarmControllerTestModule } from '../../../test.module';
import { ColheitaDetailComponent } from 'app/entities/colheita/colheita-detail.component';
import { Colheita } from 'app/shared/model/colheita.model';

describe('Component Tests', () => {
    describe('Colheita Management Detail Component', () => {
        let comp: ColheitaDetailComponent;
        let fixture: ComponentFixture<ColheitaDetailComponent>;
        const route = ({ data: of({ colheita: new Colheita('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [ColheitaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ColheitaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ColheitaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.colheita).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
