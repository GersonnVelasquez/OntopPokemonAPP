/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { PokemonDetailsComponent } from './pokemon-details.component'
import { PokemonDataAccessSelectors } from 'src/app/shared/pokemon-data-access/state/pokemon-data-access.selectors'
import { ActivatedRoute, Router } from '@angular/router'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { PokemonDataAccessActions } from 'src/app/shared/pokemon-data-access/state/pokemon-data-access.actions'

describe('PokemonDetailsComponent', () => {
  let fixture: ComponentFixture<PokemonDetailsComponent>
  let store: MockStore
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PokemonDetailsComponent],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(PokemonDetailsComponent)
    store = TestBed.inject(MockStore)
    router = TestBed.inject(Router)
  })

  it('should navigate back to the pokemon list when the back button is clicked', () => {
    const spy = spyOn(router, 'navigate')
    store.overrideSelector(PokemonDataAccessSelectors.selectIsLoading, false)
    store.overrideSelector(PokemonDataAccessSelectors.selectPokemonSelected, {
      id: 1,
      name: 'Bulbasaur',
      mainTypeColor: '#48D0B0',
    } as any)

    fixture.detectChanges()

    const compiled = fixture.debugElement.nativeElement
    const backButton = compiled.querySelector(
      '.pokemon-detail-container__navigation__back-button',
    )

    backButton.click()

    expect(spy).toHaveBeenCalledWith(['/pokemons'])
  })

  it('should display the HeaderComponent when data is available', () => {
    store.overrideSelector(PokemonDataAccessSelectors.selectIsLoading, false)
    store.overrideSelector(PokemonDataAccessSelectors.selectPokemonSelected, {
      id: 1,
      name: 'Bulbasaur',
      mainTypeColor: '#48D0B0',
    } as any)

    fixture.detectChanges()

    const headerComponent = fixture.nativeElement.querySelector('app-header')
    expect(headerComponent).toBeTruthy()
  })

  it('should display the DescriptionComponent when data is available', () => {
    store.overrideSelector(PokemonDataAccessSelectors.selectIsLoading, false)
    store.overrideSelector(PokemonDataAccessSelectors.selectPokemonSelected, {
      id: 1,
      name: 'Bulbasaur',
      mainTypeColor: '#48D0B0',
    } as any)

    fixture.detectChanges()

    const descriptionComponent =
      fixture.nativeElement.querySelector('app-description')
    expect(descriptionComponent).toBeTruthy()
  })

  it('should display the EvolutionChainComponent when data is available', () => {
    store.overrideSelector(PokemonDataAccessSelectors.selectIsLoading, false)
    store.overrideSelector(PokemonDataAccessSelectors.selectPokemonSelected, {
      id: 1,
      name: 'Bulbasaur',
      mainTypeColor: '#48D0B0',
    } as any)

    fixture.detectChanges()

    const evolutionChainComponent = fixture.nativeElement.querySelector(
      'app-evolution-chain',
    )
    expect(evolutionChainComponent).toBeTruthy()
  })

  it('should display the LoadingSpinner when data is still loading', () => {
    store.overrideSelector(PokemonDataAccessSelectors.selectIsLoading, true)
    store.overrideSelector(
      PokemonDataAccessSelectors.selectPokemonSelected,
      null,
    )

    fixture.detectChanges()

    const loadingSpinnerComponent = fixture.nativeElement.querySelector(
      'app-loading-spinner',
    )
    expect(loadingSpinnerComponent).toBeTruthy()
  })

  it('should not display data when data is still loading', () => {
    store.overrideSelector(PokemonDataAccessSelectors.selectIsLoading, true)
    store.overrideSelector(
      PokemonDataAccessSelectors.selectPokemonSelected,
      null,
    )

    fixture.detectChanges()

    const headerComponent = fixture.nativeElement.querySelector('app-header')
    const descriptionComponent =
      fixture.nativeElement.querySelector('app-description')
    const evolutionChainComponent = fixture.nativeElement.querySelector(
      'app-evolution-chain',
    )

    expect(headerComponent).toBeFalsy()
    expect(descriptionComponent).toBeFalsy()
    expect(evolutionChainComponent).toBeFalsy()
  })

  it('should dispatch the "pokemonDetailsRequested" action on initialization', () => {
    const dispatchSpy = spyOn(store, 'dispatch')
    fixture.detectChanges()

    expect(dispatchSpy).toHaveBeenCalledWith(
      PokemonDataAccessActions.pokemonDetailsRequested({
        id: 1,
      }),
    )
  })
})
