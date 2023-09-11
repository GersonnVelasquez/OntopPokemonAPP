/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { Router } from '@angular/router'
import { Observable, of, throwError } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { PokemonDataAccessService } from '../services/pokemon-data-access.service'
import { PokemonDataAccessEffects } from './pokemon-data-access.effects'
import { PokemonDataAccessActions } from './pokemon-data-access.actions'
import { PokemonDataAccessSelectors } from './pokemon-data-access.selectors'

describe('PokemonDataAccessEffects', () => {
  let actions$: Observable<any>
  let effects: PokemonDataAccessEffects
  let testScheduler: TestScheduler
  let store: MockStore
  let pokemonDataAccessService: jasmine.SpyObj<PokemonDataAccessService>
  let router: jasmine.SpyObj<Router>

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PokemonDataAccessService', [
      'getPokemonList',
      'getPokemonDetailsById',
    ])

    const routerSpy = jasmine.createSpyObj('Router', ['navigate'])

    TestBed.configureTestingModule({
      providers: [
        PokemonDataAccessEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: PokemonDataAccessService, useValue: spy },
        { provide: Router, useValue: routerSpy },
      ],
    })

    effects = TestBed.inject(PokemonDataAccessEffects)
    store = TestBed.inject(MockStore)
    pokemonDataAccessService = TestBed.inject(
      PokemonDataAccessService,
    ) as jasmine.SpyObj<PokemonDataAccessService>
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })
  })

  describe('getPokemonList$', () => {
    it('should return pokemonsRequestedSuccess action on success', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('-a', {
          a: PokemonDataAccessActions.pokemonsRequested(),
        })

        store.overrideSelector(PokemonDataAccessSelectors.selectLimit, 10)
        store.overrideSelector(PokemonDataAccessSelectors.selectOffset, 0)

        pokemonDataAccessService.getPokemonList.and.returnValue(
          of({ pokemons: [], count: 2 }),
        )

        const expected = '-a'
        const values = {
          a: PokemonDataAccessActions.pokemonsRequestedSuccess({
            pokemonList: { pokemons: [], count: 2 },
          }),
        }

        expectObservable(effects.getPokemonList$).toBe(expected, values)
      })
    })

    it('should return pokemonsRequestedFail action on failure', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('-a', {
          a: PokemonDataAccessActions.pokemonsRequested(),
        })

        store.overrideSelector(PokemonDataAccessSelectors.selectLimit, 10)
        store.overrideSelector(PokemonDataAccessSelectors.selectOffset, 0)

        const error = new Error('Error')
        pokemonDataAccessService.getPokemonList.and.returnValue(
          throwError(() => error),
        )

        const expected = '-b'
        const values = {
          b: PokemonDataAccessActions.pokemonsRequestedFail({ error }),
        }

        expectObservable(effects.getPokemonList$).toBe(expected, values)
      })
    })
  })

  describe('getPokemonListPaginated$', () => {
    it('should return pokemonsRequested action when pokemonsPaginated action is dispatched', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('-a', {
          a: PokemonDataAccessActions.pokemonsPaginated({
            paginationParams: { page: 10, pageSize: 10 },
          }),
        })

        const expected = '-b'
        const values = {
          b: PokemonDataAccessActions.pokemonsRequested(),
        }

        expectObservable(effects.getPokemonListPaginated$).toBe(
          expected,
          values,
        )
      })
    })
  })

  describe('getPokemonDetails$', () => {
    it('should return pokemonDetailsRequestedSuccess action on success', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('-a', {
          a: PokemonDataAccessActions.pokemonDetailsRequested({ id: 1 }),
        })

        const pokemonMock: any = {
          id: 1,
        }

        pokemonDataAccessService.getPokemonDetailsById.and.returnValue(
          of(pokemonMock),
        )

        const expected = '-b'
        const values = {
          b: PokemonDataAccessActions.pokemonDetailsRequestedSuccess({
            pokemon: pokemonMock,
          }),
        }

        expectObservable(effects.getPokemonDetails$).toBe(expected, values)
      })
    })

    it('should return pokemonDetailsRequestedFail action on failure', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('-a', {
          a: PokemonDataAccessActions.pokemonDetailsRequested({ id: 1 }),
        })

        const error = new Error('Error')
        pokemonDataAccessService.getPokemonDetailsById.and.returnValue(
          throwError(() => error),
        )

        const expected = '-b'
        const values = {
          b: PokemonDataAccessActions.pokemonDetailsRequestedFail({ error }),
        }

        expectObservable(effects.getPokemonDetails$).toBe(expected, values)
      })
    })
  })

  describe('selectPokemon$', () => {
    it('should navigate to the correct route', (done) => {
      actions$ = of(PokemonDataAccessActions.pokemonSelected({ pokemonId: 1 }))

      effects.selectPokemon$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['pokemon', 1])
        done()
      })
    })
  })

  describe('showErrorMessages$', () => {
    it('should show an alert with the correct message when pokemonsRequested fails', (done) => {
      spyOn(window, 'alert')

      actions$ = of(
        PokemonDataAccessActions.pokemonsRequestedFail({
          error: new Error('Error'),
        }),
      )

      effects.showErrorMessages$.subscribe(() => {
        expect(window.alert).toHaveBeenCalledWith(
          'An error occurred. Please try again later or contact support if the problem persists.',
        )
        done()
      })
    })

    it('should show an alert with the correct message when pokemonDetailsRequested fails', (done) => {
      spyOn(window, 'alert')

      actions$ = of(
        PokemonDataAccessActions.pokemonDetailsRequestedFail({
          error: new Error('Error'),
        }),
      )

      effects.showErrorMessages$.subscribe(() => {
        expect(window.alert).toHaveBeenCalledWith(
          'An error occurred. Please try again later or contact support if the problem persists.',
        )
        done()
      })
    })
  })
})
