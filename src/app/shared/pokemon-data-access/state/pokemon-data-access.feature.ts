import { createFeature } from '@ngrx/store'
import { POKEMON_DATA_ACCESS_FEATURE_KEY } from './pokemon-data-access.adapter'
import { pokemonDataAccessReducer } from './pokemon-data-access.reducer'
import { pokemonDataAccessAdapter } from './pokemon-data-access.adapter'

export const pokemonDataAccessFeature = createFeature({
  name: POKEMON_DATA_ACCESS_FEATURE_KEY,
  reducer: pokemonDataAccessReducer,
  extraSelectors: ({ selectPokemonDataAccessState }) => ({
    ...pokemonDataAccessAdapter.getSelectors(selectPokemonDataAccessState),
  }),
})
