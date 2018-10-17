import { IVenda } from 'app/shared/model//venda.model';

export interface ICliente {
    id?: string;
    nome?: string;
    vendas?: IVenda[];
}

export class Cliente implements ICliente {
    constructor(public id?: string, public nome?: string, public vendas?: IVenda[]) {}
}
