export interface PokemonSpeciesApiResponse {
  evolution_chain: {
    url: string
  }
  flavor_text_entries: FlavorTextEntry[]
}

export interface FlavorTextEntry {
  flavor_text: string
  language: {
    name: string
  }
}
