export interface IInsumo {
    id?: string;
    nome?: string;
}

export class Insumo implements IInsumo {
    constructor(public id?: string, public nome?: string) {}
}
