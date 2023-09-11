import {
  initialState,
  pokemonDataAccessReducer,
} from '../pokemon-data-access.reducer'

describe('PokemonList Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const action = {} as any

      const result = pokemonDataAccessReducer(initialState, action)

      expect(result).toBe(initialState)
    })
  })
})
