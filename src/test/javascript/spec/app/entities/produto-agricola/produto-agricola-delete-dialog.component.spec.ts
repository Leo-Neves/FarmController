/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { FarmControllerTestModule } from '../../../test.module';
import { ProdutoAgricolaDeleteDialogComponent } from 'app/entities/produto-agricola/produto-agricola-delete-dialog.component';
import { ProdutoAgricolaService } from 'app/entities/produto-agricola/produto-agricola.service';

describe('Component Tests', () => {
    describe('ProdutoAgricola Management Delete Component', () => {
        let comp: ProdutoAgricolaDeleteDialogComponent;
        let fixture: ComponentFixture<ProdutoAgricolaDeleteDialogComponent>;
        let service: ProdutoAgricolaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmControllerTestModule],
                declarations: [ProdutoAgricolaDeleteDialogComponent]
            })
                .overrideTemplate(ProdutoAgricolaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProdutoAgricolaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProdutoAgricolaService);
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
