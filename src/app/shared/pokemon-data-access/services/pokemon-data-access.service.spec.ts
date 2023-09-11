import { TestBed } from '@angular/core/testing'

import { PokemonDataAccessService } from './pokemon-data-access.service'

describe('PokemonDataAccessService', () => {
  let service: PokemonDataAccessService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(PokemonDataAccessService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
