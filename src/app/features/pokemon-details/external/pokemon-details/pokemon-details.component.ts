import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { PokemonDataAccessActions } from 'src/app/shared/pokemon-data-access/state/pokemon-data-access.actions'
import { PokemonDataAccessSelectors } from 'src/app/shared/pokemon-data-access/state/pokemon-data-access.selectors'

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  pokemonDetails$ = this.store.select(
    PokemonDataAccessSelectors.selectPokemonSelected,
  )
  isLoading$ = this.store.select(PokemonDataAccessSelectors.selectIsLoading)

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const pokemonId = this.route.snapshot.paramMap.get('id')
    if (pokemonId) {
      this.store.dispatch(
        PokemonDataAccessActions.pokemonDetailsRequested({
          id: Number(pokemonId),
        }),
      )
    }
  }

  goToList(): void {
    this.router.navigate(['/pokemons'])
  }
}
