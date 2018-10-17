import { IColheita } from 'app/shared/model//colheita.model';
import { IProdutoVenda } from 'app/shared/model//produto-venda.model';

export interface IProdutoAgricola {
    id?: string;
    nome?: string;
    colheita?: IColheita;
    produtoVenda?: IProdutoVenda;
}

export class ProdutoAgricola implements IProdutoAgricola {
    constructor(public id?: string, public nome?: string, public colheita?: IColheita, public produtoVenda?: IProdutoVenda) {}
}
