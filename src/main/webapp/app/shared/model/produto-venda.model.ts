import { IProdutoAgricola } from 'app/shared/model//produto-agricola.model';
import { IVenda } from 'app/shared/model//venda.model';

export interface IProdutoVenda {
    id?: string;
    preco?: number;
    produtosAgricolas?: IProdutoAgricola[];
    vendas?: IVenda[];
}

export class ProdutoVenda implements IProdutoVenda {
    constructor(public id?: string, public preco?: number, public produtosAgricolas?: IProdutoAgricola[], public vendas?: IVenda[]) {}
}
