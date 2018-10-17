/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FarmControllerTestModule } from '../../../test.module';
import { CulturaDetailComponent } from 'app/entities/cultura/cultura-detail.component';
import { Cultura } from 'app/shared/model/cultura.model';

describe('Component Tests', () => {
    describe('Cultura Management Detail Component', () => {
        let comp: CulturaDetailComponent;
        let fixture: ComponentFixture<CulturaDetailComponent>;
        const route = ({ data: of({ cultura: new Cultura('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [CulturaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CulturaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CulturaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cultura).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
