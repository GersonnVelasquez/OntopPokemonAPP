import { createSelector } from '@ngrx/store'
import { pokemonDataAccessFeature } from './pokemon-data-access.feature'

export const {
  selectEntities,
  selectAll,
  selectTotal,
  selectLimit,
  selectOffset,
  selectCount,
  selectLoading,
  selectPokemonSelectedId,
  selectCurrentPage,
} = pokemonDataAccessFeature

const selectPokemonSelected = createSelector(
  selectEntities,
  selectPokemonSelectedId,
  (pokemonEntities, pokemonSelectedId) =>
    pokemonSelectedId ? pokemonEntities[pokemonSelectedId] : null,
)

export const PokemonDataAccessSelectors = {
  selectAll,
  selectLimit,
  selectOffset,
  selectCount,
  selectIsLoading: selectLoading,
  selectPokemonSelected,
  selectCurrentPage,
}
