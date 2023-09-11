/* eslint-disable @typescript-eslint/no-explicit-any */
import { PokemonDataAccessActions } from './pokemon-data-access.actions'
import {
  initialState,
  pokemonDataAccessReducer,
} from './pokemon-data-access.reducer'

describe('PokemonDataAccessReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'NOOP' } as any
      const result = pokemonDataAccessReducer(undefined, action)

      expect(result).toEqual(initialState)
    })
  })

  describe('pokemonsRequested action', () => {
    it('should set loading to true', () => {
      const action = PokemonDataAccessActions.pokemonsRequested()
      const state = { ...initialState, loading: false }
      const result = pokemonDataAccessReducer(state, action)

      expect(result).toEqual({ ...state, loading: true })
    })
  })

  describe('pokemonsRequestedSuccess action', () => {
    it('should update the state with the new pokemon list and stop loading', () => {
      const pokemonList: any = {
        pokemons: [{ id: 1, name: 'Pikachu' }],
        count: 1,
      }
      const action = PokemonDataAccessActions.pokemonsRequestedSuccess({
        pokemonList,
      })
      const state = { ...initialState, loading: true }
      const result = pokemonDataAccessReducer(state, action)

      expect(result).toEqual({
        ...state,
        loading: false,
        count: 1,
        ids: [1],
        entities: { 1: { id: 1, name: 'Pikachu' } as any },
      })
    })
  })

  describe('pokemonsRequestedFail action', () => {
    it('should reset to the initial state', () => {
      const action = PokemonDataAccessActions.pokemonsRequestedFail({
        error: new Error('Error'),
      })
      const state = { ...initialState, loading: true, count: 5 }
      const result = pokemonDataAccessReducer(state, action)

      expect(result).toEqual(initialState)
    })
  })

  describe('pokemonsPaginated action', () => {
    it('should update pagination params', () => {
      const paginationParams = { page: 2, pageSize: 20 }
      const action = PokemonDataAccessActions.pokemonsPaginated({
        paginationParams,
      })
      const state = { ...initialState, count: 50 }
      const result = pokemonDataAccessReducer(state, action)

      expect(result).toEqual({
        ...state,
        limit: 20,
        currentPage: 2,
        offset: 40,
      })
    })
  })

  describe('pokemonDetailsRequested action', () => {
    it('should set loading to true and update selected pokemon id', () => {
      const action = PokemonDataAccessActions.pokemonDetailsRequested({ id: 1 })
      const state = { ...initialState, loading: false }
      const result = pokemonDataAccessReducer(state, action)

      expect(result).toEqual({ ...state, loading: true, pokemonSelectedId: 1 })
    })
  })

  describe('pokemonDetailsRequestedSuccess action', () => {
    it('should add/update the pokemon in the state and stop loading', () => {
      const pokemon: any = { id: 1, name: 'Pikachu' }
      const action = PokemonDataAccessActions.pokemonDetailsRequestedSuccess({
        pokemon,
      })
      const state = { ...initialState, loading: true }
      const result = pokemonDataAccessReducer(state, action)
      console.log(result)

      expect(result).toEqual({
        ...state,
        loading: false,
        ids: [1],
        entities: { 1: pokemon as any },
      })
    })
  })

  describe('pokemonDetailsRequestedFail action', () => {
    it('should reset to the initial state', () => {
      const action = PokemonDataAccessActions.pokemonDetailsRequestedFail({
        error: new Error('Error'),
      })
      const state = { ...initialState, loading: true, count: 5 }
      const result = pokemonDataAccessReducer(state, action)

      expect(result).toEqual({
        ...initialState,
      })
    })
  })
  describe('pokemonSelected action', () => {
    it('should update the selected pokemon id', () => {
      const action = PokemonDataAccessActions.pokemonSelected({ pokemonId: 1 })
      const state = { ...initialState }
      const result = pokemonDataAccessReducer(state, action)

      expect(result).toEqual({ ...state, pokemonSelectedId: 1 })
    })
  })
})
