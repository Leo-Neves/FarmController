/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FarmControllerTestModule } from '../../../test.module';
import { SafraComponent } from 'app/entities/safra/safra.component';
import { SafraService } from 'app/entities/safra/safra.service';
import { Safra } from 'app/shared/model/safra.model';

describe('Component Tests', () => {
    describe('Safra Management Component', () => {
        let comp: SafraComponent;
        let fixture: ComponentFixture<SafraComponent>;
        let service: SafraService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [SafraComponent],
                providers: []
            })
                .overrideTemplate(SafraComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SafraComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SafraService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Safra('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.safras[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
