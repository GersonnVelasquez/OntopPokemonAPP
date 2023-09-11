import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { pokemonDataAccessFeature } from './state/pokemon-data-access.feature'
import { PokemonDataAccessEffects } from './state/pokemon-data-access.effects'
import { PokemonDataAccessService } from './services/pokemon-data-access.service'
import { PokemonDeserializedService } from './services/pokemon-deserializer.service'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(pokemonDataAccessFeature),
    EffectsModule.forFeature([PokemonDataAccessEffects]),
  ],
  providers: [PokemonDataAccessService, PokemonDeserializedService],
})
export class PokemonDataAccessModule {}
