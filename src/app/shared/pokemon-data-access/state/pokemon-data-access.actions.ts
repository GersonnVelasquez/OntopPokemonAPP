import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { PaginationEvent } from 'src/app/shared/components/paginator/models/pagination-event.interface'
import { PokemonList } from '../models/pokemon-list.interface'
import { Pokemon } from '../models/pokemon.interface'

export const PokemonDataAccessActions = createActionGroup({
  source: 'PokemonDataAccess',
  events: {
    'Pokemons Requested': emptyProps(),
    'Pokemons Requested Success': props<{ pokemonList: PokemonList }>(),
    'Pokemons Requested Fail': props<{ error: Error }>(),
    'Pokemons Paginated': props<{ paginationParams: PaginationEvent }>(),
    'Pokemon Selected': props<{ pokemonId: number }>(),
    'Pokemon Details Requested': props<{ id: number }>(),
    'Pokemon Details Requested Success': props<{ pokemon: Pokemon }>(),
    'Pokemon Details Requested Fail': props<{ error: Error }>(),
  },
})
