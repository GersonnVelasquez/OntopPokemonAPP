/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { PokemonListComponent } from './pokemon-list.component'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { PokemonDataAccessActions } from 'src/app/shared/pokemon-data-access/state/pokemon-data-access.actions'
import { PaginationEvent } from 'src/app/shared/components/paginator/models/pagination-event.interface'
import { PokemonDataAccessSelectors } from 'src/app/shared/pokemon-data-access/state/pokemon-data-access.selectors'
import { By } from '@angular/platform-browser'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('PokemonListComponent', () => {
  let component: PokemonListComponent
  let fixture: ComponentFixture<PokemonListComponent>
  let store: MockStore

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonListComponent],
      providers: [provideMockStore()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(PokemonListComponent)
    component = fixture.componentInstance
    store = TestBed.inject(MockStore)
  }))

  it('should dispatch pokemonsRequested action on ngOnInit', () => {
    spyOn(store, 'dispatch')
    component.ngOnInit()
    expect(store.dispatch).toHaveBeenCalledWith(
      PokemonDataAccessActions.pokemonsRequested(),
    )
  })

  it('should handle pagination event and dispatch pokemonsPaginated action', () => {
    spyOn(store, 'dispatch')
    const paginationParams: PaginationEvent = {
      page: 2,
      pageSize: 10,
    }
    component.handlePagination(paginationParams)
    expect(store.dispatch).toHaveBeenCalledWith(
      PokemonDataAccessActions.pokemonsPaginated({ paginationParams }),
    )
  })

  it('should handle pokemonSelected event and dispatch pokemonSelected action', () => {
    spyOn(store, 'dispatch')
    const pokemonId = 42
    component.handlePokemonSelected(pokemonId)
    expect(store.dispatch).toHaveBeenCalledWith(
      PokemonDataAccessActions.pokemonSelected({ pokemonId }),
    )
  })

  it('should display loading spinner when isLoading is true', () => {
    store.overrideSelector(PokemonDataAccessSelectors.selectIsLoading, true)

    fixture.detectChanges()
    const loadingSpinner = fixture.debugElement.query(
      By.css('app-loading-spinner'),
    )
    expect(loadingSpinner).toBeTruthy()
  })

  it('should display pokemon cards when isLoading is false', () => {
    const pokemonList: any = [
      { id: 1, name: 'Pikachu' },
      { id: 2, name: 'Bulbasaur' },
    ]
    store.overrideSelector(PokemonDataAccessSelectors.selectIsLoading, false)
    store.overrideSelector(
      PokemonDataAccessSelectors.selectAll as any,
      pokemonList as any,
    )

    fixture.detectChanges()
    const pokemonCards = fixture.debugElement.queryAll(
      By.css('app-pokemon-card'),
    )
    expect(pokemonCards.length).toBe(pokemonList.length)
  })

  it('should display paginator when pokemonCount is available', () => {
    const pokemonCount = 50
    store.overrideSelector(PokemonDataAccessSelectors.selectCount, pokemonCount)

    fixture.detectChanges()
    const paginator = fixture.debugElement.query(By.css('app-paginator'))
    expect(paginator).toBeTruthy()
  })

  it('should not display paginator when pokemonCount is null or undefined', () => {
    store.overrideSelector(PokemonDataAccessSelectors.selectCount, null as any)

    fixture.detectChanges()
    let paginator = fixture.debugElement.query(By.css('app-paginator'))
    expect(paginator).toBeFalsy()

    store.overrideSelector(
      PokemonDataAccessSelectors.selectCount,
      undefined as any,
    )

    fixture.detectChanges()
    paginator = fixture.debugElement.query(By.css('app-paginator'))
    expect(paginator).toBeFalsy()
  })
})
