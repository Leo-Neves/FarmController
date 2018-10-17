import { IPlantio } from 'app/shared/model//plantio.model';

export interface ICultura {
    id?: string;
    nome?: string;
    nomeCientifico?: string;
    plantios?: IPlantio[];
}

export class Cultura implements ICultura {
    constructor(public id?: string, public nome?: string, public nomeCientifico?: string, public plantios?: IPlantio[]) {}
}
