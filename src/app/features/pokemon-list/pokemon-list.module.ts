import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PokemonListRoutingModule } from './pokemon-list-routing.module'
import { PokemonListComponent } from './external/pokemon-list/pokemon-list.component'
import { PokemonCardComponent } from './component/pokemon-card/pokemon-card.component'
import { PaginatorModule } from 'src/app/shared/components/paginator/paginator.module'
import { PokemonDataAccessModule } from 'src/app/shared/pokemon-data-access/pokemon-data-access.module'
import { LoadingSpinnerModule } from 'src/app/shared/components/loading-spinner/loading-spinner.module'

@NgModule({
  declarations: [PokemonListComponent, PokemonCardComponent],
  imports: [
    CommonModule,
    PokemonListRoutingModule,
    PaginatorModule,
    PokemonDataAccessModule,
    LoadingSpinnerModule,
  ],
})
export class PokemonListModule {}
