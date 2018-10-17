/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { FarmControllerTestModule } from '../../../test.module';
import { CulturaDeleteDialogComponent } from 'app/entities/cultura/cultura-delete-dialog.component';
import { CulturaService } from 'app/entities/cultura/cultura.service';

describe('Component Tests', () => {
    describe('Cultura Management Delete Component', () => {
        let comp: CulturaDeleteDialogComponent;
        let fixture: ComponentFixture<CulturaDeleteDialogComponent>;
        let service: CulturaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [CulturaDeleteDialogComponent]
            })
                .overrideTemplate(CulturaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CulturaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CulturaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete('123');
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith('123');
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
