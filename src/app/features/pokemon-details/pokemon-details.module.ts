import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PokemonDetailsRoutingModule } from './pokemon-details-routing.module'
import { PokemonDetailsComponent } from './external/pokemon-details/pokemon-details.component'
import { PokemonDataAccessModule } from 'src/app/shared/pokemon-data-access/pokemon-data-access.module'
import { LoadingSpinnerModule } from 'src/app/shared/components/loading-spinner/loading-spinner.module'
import { HeaderComponent } from './components/header/header.component'
import { DescriptionComponent } from './components/description/description.component'
import { EvolutionChainComponent } from './components/evolution-chain/evolution-chain.component'

@NgModule({
  declarations: [
    PokemonDetailsComponent,
    HeaderComponent,
    DescriptionComponent,
    EvolutionChainComponent,
  ],
  imports: [
    CommonModule,
    PokemonDetailsRoutingModule,
    PokemonDataAccessModule,
    LoadingSpinnerModule,
  ],
})
export class PokemonDetailsModule {}
