export interface PokemonListApiResponse {
  count: number
  next: string
  previous: string
  results: PokemonListApiResult[]
}

export interface PokemonListApiResult {
  name: string
  url: string
}
