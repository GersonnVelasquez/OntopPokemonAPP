export interface PokemonEvolutionChainApiResponse {
  chain: PokemonEvolutionChain
}

export interface PokemonEvolutionChain {
  species: {
    name: string
  }
  evolves_to: PokemonEvolutionChain[]
}
