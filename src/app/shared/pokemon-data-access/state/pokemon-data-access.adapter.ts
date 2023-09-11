import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Pokemon } from '../models/pokemon.interface'
4
export const POKEMON_DATA_ACCESS_FEATURE_KEY = 'PokemonDataAccess'

export interface PokemonDataAccessState extends EntityState<Pokemon> {
  loading: boolean
  limit: number
  offset: number
  currentPage: number
  count: number
  pokemonSelectedId: number | null
}

export const pokemonDataAccessAdapter: EntityAdapter<Pokemon> =
  createEntityAdapter<Pokemon>()
