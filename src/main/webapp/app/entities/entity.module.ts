import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FarmControllerProdutorModule } from './produtor/produtor.module';
import { FarmControllerFazendaModule } from './fazenda/fazenda.module';
import { FarmControllerTalhaoModule } from './talhao/talhao.module';
import { FarmControllerSafraModule } from './safra/safra.module';
import { FarmControllerCulturaModule } from './cultura/cultura.module';
import { FarmControllerPlantioModule } from './plantio/plantio.module';
import { FarmControllerInsumoModule } from './insumo/insumo.module';
import { FarmControllerAtividadeModule } from './atividade/atividade.module';
import { FarmControllerColheitaModule } from './colheita/colheita.module';
import { FarmControllerProdutoAgricolaModule } from './produto-agricola/produto-agricola.module';
import { FarmControllerProdutoVendaModule } from './produto-venda/produto-venda.module';
import { FarmControllerVendaModule } from './venda/venda.module';
import { FarmControllerClienteModule } from './cliente/cliente.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        FarmControllerProdutorModule,
        FarmControllerFazendaModule,
        FarmControllerTalhaoModule,
        FarmControllerSafraModule,
        FarmControllerCulturaModule,
        FarmControllerPlantioModule,
        FarmControllerInsumoModule,
        FarmControllerAtividadeModule,
        FarmControllerColheitaModule,
        FarmControllerProdutoAgricolaModule,
        FarmControllerProdutoVendaModule,
        FarmControllerVendaModule,
        FarmControllerClienteModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FarmControllerEntityModule {}
