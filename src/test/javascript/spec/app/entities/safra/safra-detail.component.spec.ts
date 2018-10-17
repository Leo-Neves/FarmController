/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FarmControllerTestModule } from '../../../test.module';
import { SafraDetailComponent } from 'app/entities/safra/safra-detail.component';
import { Safra } from 'app/shared/model/safra.model';

describe('Component Tests', () => {
    describe('Safra Management Detail Component', () => {
        let comp: SafraDetailComponent;
        let fixture: ComponentFixture<SafraDetailComponent>;
        const route = ({ data: of({ safra: new Safra('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [SafraDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SafraDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SafraDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.safra).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
