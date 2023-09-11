import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { PokemonDataAccessActions } from './pokemon-data-access.actions'
import { PokemonDataAccessService } from '../services/pokemon-data-access.service'
import { PokemonDataAccessSelectors } from './pokemon-data-access.selectors'

@Injectable()
export class PokemonDataAccessEffects {
  getPokemonList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonDataAccessActions.pokemonsRequested),
      concatLatestFrom(() => [
        this.store.select(PokemonDataAccessSelectors.selectLimit),
        this.store.select(PokemonDataAccessSelectors.selectOffset),
      ]),
      switchMap(([, limit, offset]) =>
        this.pokemonDataAccessService
          .getPokemonList({
            limit,
            offset,
          })
          .pipe(
            map((pokemonList) =>
              PokemonDataAccessActions.pokemonsRequestedSuccess({
                pokemonList,
              }),
            ),
            catchError((error) =>
              of(PokemonDataAccessActions.pokemonsRequestedFail({ error })),
            ),
          ),
      ),
    )
  })

  getPokemonListPaginated$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonDataAccessActions.pokemonsPaginated),
      map(() => PokemonDataAccessActions.pokemonsRequested()),
    )
  })

  getPokemonDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonDataAccessActions.pokemonDetailsRequested),
      switchMap(({ id }) =>
        this.pokemonDataAccessService.getPokemonDetailsById(id).pipe(
          map((pokemon) =>
            PokemonDataAccessActions.pokemonDetailsRequestedSuccess({
              pokemon,
            }),
          ),
          catchError((error) =>
            of(PokemonDataAccessActions.pokemonDetailsRequestedFail({ error })),
          ),
        ),
      ),
    )
  })

  selectPokemon$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PokemonDataAccessActions.pokemonSelected),
        map(({ pokemonId }) => this.router.navigate(['pokemon', pokemonId])),
      )
    },
    { dispatch: false },
  )

  showErrorMessages$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          PokemonDataAccessActions.pokemonsRequestedFail,
          PokemonDataAccessActions.pokemonDetailsRequestedFail,
        ),
        map(() => {
          // Really Basic Error Handling
          alert(
            'An error occurred. Please try again later or contact support if the problem persists.',
          )
        }),
      )
    },
    { dispatch: false },
  )

  constructor(
    private actions$: Actions,
    private pokemonDataAccessService: PokemonDataAccessService,
    private store: Store,
    private router: Router,
  ) {}
}
