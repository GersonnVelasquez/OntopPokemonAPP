import { createReducer, on } from '@ngrx/store'
import { PokemonDataAccessActions } from './pokemon-data-access.actions'
import {
  PokemonDataAccessState,
  pokemonDataAccessAdapter,
} from './pokemon-data-access.adapter'
import { INITIAL_PAGE_SIZE } from 'src/app/shared/constants/initial-page-size.const'

export const initialState: PokemonDataAccessState =
  pokemonDataAccessAdapter.getInitialState({
    loading: false,
    limit: INITIAL_PAGE_SIZE,
    offset: 0,
    currentPage: 1,
    count: 0,
    pokemonSelectedId: null,
  })

export const pokemonDataAccessReducer = createReducer(
  initialState,
  on(
    PokemonDataAccessActions.pokemonsRequested,
    (state: PokemonDataAccessState): PokemonDataAccessState => ({
      ...state,
      loading: true,
    }),
  ),
  on(
    PokemonDataAccessActions.pokemonsRequestedSuccess,
    (state: PokemonDataAccessState, { pokemonList }): PokemonDataAccessState =>
      pokemonDataAccessAdapter.setAll(pokemonList.pokemons, {
        ...state,
        loading: false,
        count: pokemonList.count,
      }),
  ),
  on(
    PokemonDataAccessActions.pokemonsRequestedFail,
    (): PokemonDataAccessState => ({
      ...initialState,
    }),
  ),
  on(
    PokemonDataAccessActions.pokemonsPaginated,
    (
      state: PokemonDataAccessState,
      { paginationParams },
    ): PokemonDataAccessState => {
      let newOffset =
        paginationParams.page === 1
          ? 0
          : paginationParams.page * paginationParams.pageSize

      if (newOffset > state.count) {
        newOffset = state.count - paginationParams.pageSize
      }

      return {
        ...state,
        limit: paginationParams.pageSize,
        currentPage: paginationParams.page,
        offset: newOffset,
      }
    },
  ),

  on(
    PokemonDataAccessActions.pokemonDetailsRequested,
    (state: PokemonDataAccessState, { id }): PokemonDataAccessState => ({
      ...state,
      loading: true,
      pokemonSelectedId: id,
    }),
  ),
  on(
    PokemonDataAccessActions.pokemonDetailsRequestedSuccess,
    (state: PokemonDataAccessState, { pokemon }): PokemonDataAccessState =>
      pokemonDataAccessAdapter.upsertOne(pokemon, {
        ...state,
        loading: false,
      }),
  ),
  on(
    PokemonDataAccessActions.pokemonsRequestedFail,
    (): PokemonDataAccessState => ({
      ...initialState,
    }),
  ),
  on(
    PokemonDataAccessActions.pokemonSelected,
    (state: PokemonDataAccessState, { pokemonId }): PokemonDataAccessState => ({
      ...state,
      pokemonSelectedId: pokemonId,
    }),
  ),
)
