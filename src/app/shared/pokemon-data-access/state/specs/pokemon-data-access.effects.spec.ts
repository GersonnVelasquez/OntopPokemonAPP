import { TestBed } from '@angular/core/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { Observable } from 'rxjs'

import { PokemonDataAccessEffects } from '../pokemon-data-access.effects'

describe('PokemonDataAccessEffects', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let actions$: Observable<any>
  let effects: PokemonDataAccessEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonDataAccessEffects, provideMockActions(() => actions$)],
    })

    effects = TestBed.inject(PokemonDataAccessEffects)
  })

  it('should be created', () => {
    expect(effects).toBeTruthy()
  })
})
