/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing'
import { PokemonDeserializedService } from './pokemon-deserializer.service'
import { PokemonDetailsApiResponse } from '../models/pokemon-details-api-response.interface'
import { PokemonTypeColors } from 'src/app/shared/constants/pokemon-type-colors.enum'

describe('PokemonDeserializedService', () => {
  let service: PokemonDeserializedService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonDeserializedService],
    })
    service = TestBed.inject(PokemonDeserializedService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('deserialize', () => {
    it('should correctly deserialize pokemon data', () => {
      const mapDetailsToPokemonResponse: any = {
        id: 1,
      }
      const mapSpeciesToPokemonResponse: any = {
        description: 'testDescription',
      }
      const mapEvolutionChainToPokemonResponse: any = {
        evolutionChain: 'testEvolutionChain',
      }

      spyOn(service, 'mapDetailsToPokemon').and.returnValue(
        mapDetailsToPokemonResponse,
      )
      spyOn(service, 'mapSpeciesToPokemon').and.returnValue(
        mapSpeciesToPokemonResponse,
      )
      spyOn(service, 'mapEvolutionChainToPokemon').and.returnValue(
        mapEvolutionChainToPokemonResponse,
      )

      const pokemonData: any = {
        details: {},
        species: {},
        evolutionChain: {},
      }

      const result = service.deserialize(pokemonData)

      expect(result).toEqual({
        ...mapDetailsToPokemonResponse,
        ...mapSpeciesToPokemonResponse,
        ...mapEvolutionChainToPokemonResponse,
      } as any)
    })
  })

  describe('mapDetailsToPokemon', () => {
    it('should map details to pokemon correctly', () => {
      const details: PokemonDetailsApiResponse = {
        id: 1,
        name: 'testName',
        sprites: { front_default: 'testImageUrl' },
        types: [{ type: { name: 'dragon' } }, { type: { name: 'testType2' } }],
      }

      const expected: any = {
        id: 1,
        name: 'testName',
        imageUrl: 'testImageUrl',
        pokedexNumber: '001',
        mainType: 'dragon',
        types: ['dragon', 'testType2'],
        mainTypeColor: PokemonTypeColors.dragon,
      }

      const result = (service as any).mapDetailsToPokemon(details)
      expect(result).toEqual(expected)
    })
  })

  describe('mapSpeciesToPokemon', () => {
    it('should map species to pokemon correctly when description is present', () => {
      const species: any = {
        flavor_text_entries: [
          { language: { name: 'en' }, flavor_text: 'testDescriptionEn' },
          { language: { name: 'es' }, flavor_text: 'testDescriptionEs' },
        ],
      }

      const expected: any = {
        description: 'testDescriptionEn',
      }

      const result = (service as any).mapSpeciesToPokemon(species)
      expect(result).toEqual(expected)
    })

    it('should return "No Description" when no english description is present', () => {
      const species: any = {
        flavor_text_entries: [
          { language: { name: 'es' }, flavor_text: 'testDescriptionEs' },
        ],
      }

      const expected: any = {
        description: 'No Description',
      }

      const result = (service as any).mapSpeciesToPokemon(species)
      expect(result).toEqual(expected)
    })
  })

  describe('mapEvolutionChainToPokemon', () => {
    it('should correctly map the evolution chain to pokemon', () => {
      const evolutionChainApiResponse: any = {
        chain: {},
      }

      const expectedEvolutionNames = ['testName1', 'testName2', 'testName3']

      spyOn(service, 'extractEvolutionNames').and.returnValue(
        expectedEvolutionNames,
      )

      const result = (service as any).mapEvolutionChainToPokemon(
        evolutionChainApiResponse,
      )
      expect(result).toEqual({ evolutionChain: expectedEvolutionNames })
    })
  })

  describe('extractEvolutionNames', () => {
    it('should correctly extract evolution names from the chain', () => {
      const chain = {
        species: { name: 'testName1' },
        evolves_to: [
          {
            species: { name: 'testName2' },
            evolves_to: [
              {
                species: { name: 'testName3' },
                evolves_to: [],
              },
            ],
          },
        ],
      }

      const expected = ['testName1', 'testName2', 'testName3']

      const result = (service as any).extractEvolutionNames(chain)
      expect(result).toEqual(expected)
    })
  })
})
