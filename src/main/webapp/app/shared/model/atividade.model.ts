export interface IAtividade {
    id?: string;
    nome?: string;
}

export class Atividade implements IAtividade {
    constructor(public id?: string, public nome?: string) {}
}
