/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { FarmControllerTestModule } from '../../../test.module';
import { ProdutorDeleteDialogComponent } from 'app/entities/produtor/produtor-delete-dialog.component';
import { ProdutorService } from 'app/entities/produtor/produtor.service';

describe('Component Tests', () => {
    describe('Produtor Management Delete Component', () => {
        let comp: ProdutorDeleteDialogComponent;
        let fixture: ComponentFixture<ProdutorDeleteDialogComponent>;
        let service: ProdutorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [ProdutorDeleteDialogComponent]
            })
                .overrideTemplate(ProdutorDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProdutorDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProdutorService);
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
