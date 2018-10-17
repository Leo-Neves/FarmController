/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { FarmControllerTestModule } from '../../../test.module';
import { ColheitaDeleteDialogComponent } from 'app/entities/colheita/colheita-delete-dialog.component';
import { ColheitaService } from 'app/entities/colheita/colheita.service';

describe('Component Tests', () => {
    describe('Colheita Management Delete Component', () => {
        let comp: ColheitaDeleteDialogComponent;
        let fixture: ComponentFixture<ColheitaDeleteDialogComponent>;
        let service: ColheitaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [ColheitaDeleteDialogComponent]
            })
                .overrideTemplate(ColheitaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ColheitaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColheitaService);
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
