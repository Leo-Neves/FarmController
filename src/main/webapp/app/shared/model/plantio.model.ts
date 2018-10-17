import { Moment } from 'moment';
import { ITalhao } from 'app/shared/model//talhao.model';
import { ICultura } from 'app/shared/model//cultura.model';
import { IColheita } from 'app/shared/model//colheita.model';
import { ISafra } from 'app/shared/model//safra.model';
import { IInsumo } from 'app/shared/model//insumo.model';
import { IAtividade } from 'app/shared/model//atividade.model';

export interface IPlantio {
    id?: string;
    dataPlantio?: Moment;
    dataPrevisaoColheita?: Moment;
    quantidadePlantado?: number;
    talhao?: ITalhao;
    cultura?: ICultura;
    colheita?: IColheita;
    safras?: ISafra[];
    insumos?: IInsumo[];
    atividades?: IAtividade[];
}

export class Plantio implements IPlantio {
    constructor(
        public id?: string,
        public dataPlantio?: Moment,
        public dataPrevisaoColheita?: Moment,
        public quantidadePlantado?: number,
        public talhao?: ITalhao,
        public cultura?: ICultura,
        public colheita?: IColheita,
        public safras?: ISafra[],
        public insumos?: IInsumo[],
        public atividades?: IAtividade[]
    ) {}
}
