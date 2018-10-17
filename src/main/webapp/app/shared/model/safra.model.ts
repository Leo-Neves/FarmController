import { Moment } from 'moment';
import { IPlantio } from 'app/shared/model//plantio.model';

export interface ISafra {
    id?: string;
    alcunha?: string;
    dataInicio?: Moment;
    dataFim?: Moment;
    plantio?: IPlantio;
}

export class Safra implements ISafra {
    constructor(
        public id?: string,
        public alcunha?: string,
        public dataInicio?: Moment,
        public dataFim?: Moment,
        public plantio?: IPlantio
    ) {}
}
