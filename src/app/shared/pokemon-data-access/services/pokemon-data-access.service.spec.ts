/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing'
import { TestScheduler } from 'rxjs/testing'
import { of } from 'rxjs'
import { PokemonDataAccessService } from './pokemon-data-access.service'
import { MyHttpService } from 'src/app/core/services/my-http.service'
import { PokemonDeserializedService } from './pokemon-deserializer.service'

describe('PokemonDataAccessService', () => {
  let service: PokemonDataAccessService
  let httpServiceSpy: jasmine.SpyObj<MyHttpService>
  let deserializerServiceSpy: jasmine.SpyObj<PokemonDeserializedService>
  let testScheduler: TestScheduler

  beforeEach(() => {
    httpServiceSpy = jasmine.createSpyObj('MyHttpService', ['doGet'])
    deserializerServiceSpy = jasmine.createSpyObj(
      'PokemonDeserializedService',
      ['deserialize'],
    )

    TestBed.configureTestingModule({
      providers: [
        PokemonDataAccessService,
        { provide: MyHttpService, useValue: httpServiceSpy },
        {
          provide: PokemonDeserializedService,
          useValue: deserializerServiceSpy,
        },
      ],
    })

    service = TestBed.inject(PokemonDataAccessService)

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('getPokemonList', () => {
    it('should fetch the pokemon list and deserialize it', () => {
      testScheduler.run(({ expectObservable }) => {
        httpServiceSpy.doGet.and.returnValue(
          of({
            count: 2,
            results: [{ name: 'testName1' }, { name: 'testName2' }],
          }),
        )
        spyOn(service, 'getPokemonDetails').and.returnValue(of({} as any))
        deserializerServiceSpy.deserialize.and.returnValue({} as any)

        const expectedMarble = '(b|)'
        const expectedValues = {
          b: {
            count: 2,
            pokemons: [{}, {}],
          },
        }

        const source$ = service.getPokemonList({ limit: 2, offset: 0 })
        expectObservable(source$).toBe(expectedMarble, expectedValues)
      })
    })
  })

  describe('getPokemonDetailsById', () => {
    it('should fetch the pokemon details, extra details and deserialize it', () => {
      testScheduler.run(({ expectObservable }) => {
        spyOn(service, 'getPokemonDetails').and.returnValue(
          of({
            id: 1,
          } as any),
        )

        spyOn(service, 'getPokemonExtraDetails').and.returnValue(
          of({
            details: { id: 1 },
            species: {},
            evolutionChain: {},
          } as any),
        )

        deserializerServiceSpy.deserialize.and.returnValue({} as any)

        const expectedMarble = '(b|)'
        const expectedValues = {
          b: {},
        }

        const source$ = service.getPokemonDetailsById(1)

        expectObservable(source$).toBe(expectedMarble, expectedValues)
      })
    })
  })

  describe('getPokemonExtraDetails', () => {
    it('should fetch the pokemon species and evolution chain and return a PokemonData object', () => {
      testScheduler.run(({ expectObservable }) => {
        spyOn(service, 'getPokemonSpecies').and.returnValue(
          of({
            evolution_chain: {
              url: 'https://api.example.com/evolution-chain/1',
            },
          } as any),
        )

        spyOn(service, 'getEvolutionChain').and.returnValue(of({} as any))

        const pokemonDetails: any = {
          id: 1,
        }

        const expectedMarble = '(b|)'
        const expectedValues = {
          b: {
            details: pokemonDetails,
            species: {
              evolution_chain: {
                url: 'https://api.example.com/evolution-chain/1',
              },
            },
            evolutionChain: {},
          },
        }

        const source$ = service.getPokemonExtraDetails(pokemonDetails)

        expectObservable(source$).toBe(expectedMarble, expectedValues)
      })
    })
  })

  describe('getPokemonDetails', () => {
    it('should call doGet with correct URL and return the response', () => {
      testScheduler.run(({ expectObservable }) => {
        const apiResponse: any = {}

        httpServiceSpy.doGet.and.returnValue(of(apiResponse))

        const expectedMarble = '(b|)'
        const expectedValues = { b: apiResponse }

        const source$ = service.getPokemonDetails('pikachu')

        expectObservable(source$).toBe(expectedMarble, expectedValues)

        expect(httpServiceSpy.doGet).toHaveBeenCalledWith(
          'api/v2/pokemon/pikachu',
        )
      })
    })
  })

  describe('getPokemonSpecies', () => {
    it('should call doGet with correct URL and return the response', () => {
      testScheduler.run(({ expectObservable }) => {
        const apiResponse: any = {}

        httpServiceSpy.doGet.and.returnValue(of(apiResponse))

        const expectedMarble = '(b|)'
        const expectedValues = { b: apiResponse }

        const source$ = service.getPokemonSpecies(1)

        expectObservable(source$).toBe(expectedMarble, expectedValues)

        expect(httpServiceSpy.doGet).toHaveBeenCalledWith(
          'api/v2/pokemon-species/1',
        )
      })
    })
  })

  describe('getEvolutionChain', () => {
    it('should call doGet with correct URL and return the response', () => {
      testScheduler.run(({ expectObservable }) => {
        const apiResponse: any = {}

        httpServiceSpy.doGet.and.returnValue(of(apiResponse))

        const expectedMarble = '(b|)'
        const expectedValues = { b: apiResponse }

        const source$ = service.getEvolutionChain('1')

        expectObservable(source$).toBe(expectedMarble, expectedValues)

        expect(httpServiceSpy.doGet).toHaveBeenCalledWith(
          'api/v2/evolution-chain/1',
        )
      })
    })
  })
})
