import { Moment } from 'moment';
import { IProdutoAgricola } from 'app/shared/model//produto-agricola.model';
import { IPlantio } from 'app/shared/model//plantio.model';

export interface IColheita {
    id?: string;
    dataColheita?: Moment;
    produtividade?: number;
    produtoAgricola?: IProdutoAgricola;
    plantio?: IPlantio;
}

export class Colheita implements IColheita {
    constructor(
        public id?: string,
        public dataColheita?: Moment,
        public produtividade?: number,
        public produtoAgricola?: IProdutoAgricola,
        public plantio?: IPlantio
    ) {}
}
