import { Moment } from 'moment';
import { IFazenda } from 'app/shared/model//fazenda.model';

export interface IProdutor {
    id?: string;
    nome?: string;
    cpf?: number;
    dataNascimento?: Moment;
    fazendas?: IFazenda[];
}

export class Produtor implements IProdutor {
    constructor(
        public id?: string,
        public nome?: string,
        public cpf?: number,
        public dataNascimento?: Moment,
        public fazendas?: IFazenda[]
    ) {}
}
