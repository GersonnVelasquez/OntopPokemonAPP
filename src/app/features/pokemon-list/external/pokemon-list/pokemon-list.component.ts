import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { PokemonDataAccessActions } from 'src/app/shared/pokemon-data-access/state/pokemon-data-access.actions'
import { PokemonDataAccessSelectors } from 'src/app/shared/pokemon-data-access/state/pokemon-data-access.selectors'
import { PaginationEvent } from 'src/app/shared/components/paginator/models/pagination-event.interface'
import { Pokemon } from 'src/app/shared/pokemon-data-access/models/pokemon.interface'

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemonList$ = this.store.select(PokemonDataAccessSelectors.selectAll)
  pokemonCount$ = this.store.select(PokemonDataAccessSelectors.selectCount)
  pokemonListLoading$ = this.store.select(
    PokemonDataAccessSelectors.selectIsLoading,
  )
  pokemonListLimit$ = this.store.select(PokemonDataAccessSelectors.selectLimit)
  pokemonListCurrentPage$ = this.store.select(
    PokemonDataAccessSelectors.selectCurrentPage,
  )

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(PokemonDataAccessActions.pokemonsRequested())
  }

  trackByFn(index: number, pokemon: Pokemon): number {
    return pokemon.id
  }

  handlePagination(paginationParams: PaginationEvent): void {
    this.store.dispatch(
      PokemonDataAccessActions.pokemonsPaginated({ paginationParams }),
    )
  }

  handlePokemonSelected(pokemonId: number): void {
    this.store.dispatch(PokemonDataAccessActions.pokemonSelected({ pokemonId }))
  }
}
