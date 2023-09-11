import { Injectable } from '@angular/core'
import { PokemonDetailsApiResponse } from '../models/pokemon-details-api-response.interface'
import { PokemonTypeColors } from 'src/app/shared/constants/pokemon-type-colors.enum'
import { PokemonSpeciesApiResponse } from '../models/pokemon-species-api-response.interface'
import {
  PokemonEvolutionChain,
  PokemonEvolutionChainApiResponse,
} from '../models/pokemon-evolution-chain-api-response.interface'
import { Pokemon } from '../models/pokemon.interface'

@Injectable()
export class PokemonDeserializedService {
  deserialize(pokemonData: PokemonData): Pokemon {
    const pokemon: Partial<Pokemon> = {}

    if (pokemonData.details) {
      Object.assign(pokemon, this.mapDetailsToPokemon(pokemonData.details))
    }

    if (pokemonData.species) {
      Object.assign(pokemon, this.mapSpeciesToPokemon(pokemonData.species))
    }

    if (pokemonData.evolutionChain) {
      Object.assign(
        pokemon,
        this.mapEvolutionChainToPokemon(pokemonData.evolutionChain),
      )
    }

    return pokemon as Pokemon
  }

  mapDetailsToPokemon(details: PokemonDetailsApiResponse): Partial<Pokemon> {
    return {
      id: details.id,
      name: details.name,
      imageUrl: details.sprites.front_default,
      pokedexNumber: details.id.toString().padStart(3, '0'),
      mainType: details.types[0].type.name,
      types: details.types.map((type) => type.type.name),
      mainTypeColor:
        PokemonTypeColors[
          details.types[0].type.name as keyof typeof PokemonTypeColors
        ],
    }
  }

  mapSpeciesToPokemon(species: PokemonSpeciesApiResponse): Partial<Pokemon> {
    const descriptionEntry = species.flavor_text_entries.find(
      (entry) => entry.language.name === 'en',
    )
    return {
      description: descriptionEntry
        ? descriptionEntry.flavor_text
        : 'No Description',
    }
  }

  mapEvolutionChainToPokemon(
    evolutionChain: PokemonEvolutionChainApiResponse,
  ): Partial<Pokemon> {
    return {
      evolutionChain: this.extractEvolutionNames(evolutionChain.chain),
    }
  }

  extractEvolutionNames(chain: PokemonEvolutionChain | undefined): string[] {
    const evolutionNames: string[] = []
    let currentStage = chain

    while (currentStage) {
      evolutionNames.push(currentStage.species.name)
      currentStage = currentStage.evolves_to[0]
    }

    return evolutionNames
  }
}

export type PokemonData = {
  details?: PokemonDetailsApiResponse
  species?: PokemonSpeciesApiResponse
  evolutionChain?: PokemonEvolutionChainApiResponse
}
