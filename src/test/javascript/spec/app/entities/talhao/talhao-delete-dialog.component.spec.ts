/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { FarmControllerTestModule } from '../../../test.module';
import { TalhaoDeleteDialogComponent } from 'app/entities/talhao/talhao-delete-dialog.component';
import { TalhaoService } from 'app/entities/talhao/talhao.service';

describe('Component Tests', () => {
    describe('Talhao Management Delete Component', () => {
        let comp: TalhaoDeleteDialogComponent;
        let fixture: ComponentFixture<TalhaoDeleteDialogComponent>;
        let service: TalhaoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [TalhaoDeleteDialogComponent]
            })
                .overrideTemplate(TalhaoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TalhaoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TalhaoService);
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
