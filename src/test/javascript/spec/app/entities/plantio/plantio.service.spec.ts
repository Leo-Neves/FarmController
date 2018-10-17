/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { PlantioService } from 'app/entities/plantio/plantio.service';
import { IPlantio, Plantio } from 'app/shared/model/plantio.model';

describe('Service Tests', () => {
    describe('Plantio Service', () => {
        let injector: TestBed;
        let service: PlantioService;
        let httpMock: HttpTestingController;
        let elemDefault: IPlantio;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(PlantioService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Plantio('ID', currentDate, currentDate, 0);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dataPlantio: currentDate.format(DATE_FORMAT),
                        dataPrevisaoColheita: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find('123')
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Plantio', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 'ID',
                        dataPlantio: currentDate.format(DATE_FORMAT),
                        dataPrevisaoColheita: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dataPlantio: currentDate,
                        dataPrevisaoColheita: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Plantio(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Plantio', async () => {
                const returnedFromService = Object.assign(
                    {
                        dataPlantio: currentDate.format(DATE_FORMAT),
                        dataPrevisaoColheita: currentDate.format(DATE_FORMAT),
                        quantidadePlantado: 1
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dataPlantio: currentDate,
                        dataPrevisaoColheita: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Plantio', async () => {
                const returnedFromService = Object.assign(
                    {
                        dataPlantio: currentDate.format(DATE_FORMAT),
                        dataPrevisaoColheita: currentDate.format(DATE_FORMAT),
                        quantidadePlantado: 1
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dataPlantio: currentDate,
                        dataPrevisaoColheita: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Plantio', async () => {
                const rxPromise = service.delete('123').subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
