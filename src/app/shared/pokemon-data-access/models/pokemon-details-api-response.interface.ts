export interface PokemonDetailsApiResponse {
  sprites: Sprites
  id: number
  name: string
  types: Type[]
}

export interface Sprites {
  front_default: string
}

export interface Type {
  type: {
    name: string
  }
}
