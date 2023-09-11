/* eslint-disable @typescript-eslint/no-explicit-any */
import { PokemonDataAccessSelectors } from './pokemon-data-access.selectors'

describe('PokemonDataAccess Selectors', () => {
  describe('selectPokemonSelected', () => {
    it('should return the selected Pokemon', () => {
      const pokemonEntities: any = {
        1: { id: 1, name: 'Pikachu' },
        2: { id: 2, name: 'Bulbasaur' },
      }
      const pokemonSelectedId = 1

      expect(
        PokemonDataAccessSelectors.selectPokemonSelected.projector(
          pokemonEntities,
          pokemonSelectedId,
        ),
      ).toEqual({
        id: 1,
        name: 'Pikachu',
      } as any)
    })

    it('should return null if no Pokemon is selected', () => {
      const pokemonEntities: any = {
        1: { id: 1, name: 'Pikachu' },
        2: { id: 2, name: 'Bulbasaur' },
      }
      const pokemonSelectedId = null

      expect(
        PokemonDataAccessSelectors.selectPokemonSelected.projector(
          pokemonEntities,
          pokemonSelectedId,
        ),
      ).toBeNull()
    })
  })
})
