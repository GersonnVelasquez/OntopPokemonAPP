import { Injectable } from '@angular/core'
import { Observable, forkJoin, map, switchMap } from 'rxjs'
import { MyHttpService } from 'src/app/core/services/my-http.service'
import { PokemonListQueryParams } from '../models/pokemon-list-query-params.interface'
import { PokemonListApiResponse } from '../models/pokemon-list-api-response.interface'
import { PokemonDetailsApiResponse } from '../models/pokemon-details-api-response.interface'
import { PokemonList } from '../models/pokemon-list.interface'
import { PokemonSpeciesApiResponse } from '../models/pokemon-species-api-response.interface'
import { PokemonEvolutionChainApiResponse } from '../models/pokemon-evolution-chain-api-response.interface'
import { Pokemon } from '../models/pokemon.interface'
import {
  PokemonData,
  PokemonDeserializedService,
} from './pokemon-deserializer.service'

@Injectable()
export class PokemonDataAccessService {
  constructor(
    private myHttpService: MyHttpService,
    private pokemonDeserializedService: PokemonDeserializedService,
  ) {}

  getPokemonList(params: PokemonListQueryParams): Observable<PokemonList> {
    return this.myHttpService
      .doGet<PokemonListApiResponse>('api/v2/pokemon', params)
      .pipe(
        switchMap((response) =>
          forkJoin(
            response.results.map((pokemon) =>
              this.getPokemonDetails(pokemon.name).pipe(
                map((details) =>
                  this.pokemonDeserializedService.deserialize({
                    details,
                  }),
                ),
              ),
            ),
          ).pipe(
            map((pokemons) => ({
              count: response.count,
              pokemons,
            })),
          ),
        ),
      )
  }

  getPokemonDetailsById(id: number): Observable<Pokemon> {
    return this.getPokemonDetails(id).pipe(
      switchMap((details) => this.getPokemonExtraDetails(details)),
      map((pokemonData) =>
        this.pokemonDeserializedService.deserialize(pokemonData),
      ),
    )
  }

  getPokemonExtraDetails(
    details: PokemonDetailsApiResponse,
  ): Observable<PokemonData> {
    return this.getPokemonSpecies(details.id).pipe(
      switchMap((species) => {
        const evolutionChainId =
          species.evolution_chain.url.split('/').filter(Boolean).pop() ?? ''
        return this.getEvolutionChain(evolutionChainId).pipe(
          map((evolutionChain) => ({ details, species, evolutionChain })),
        )
      }),
    )
  }

  getPokemonDetails(
    nameOrId: string | number,
  ): Observable<PokemonDetailsApiResponse> {
    return this.myHttpService.doGet<PokemonDetailsApiResponse>(
      `api/v2/pokemon/${nameOrId}`,
    )
  }

  getPokemonSpecies(id: number): Observable<PokemonSpeciesApiResponse> {
    return this.myHttpService.doGet(`api/v2/pokemon-species/${id}`)
  }

  getEvolutionChain(id: string): Observable<PokemonEvolutionChainApiResponse> {
    return this.myHttpService.doGet(`api/v2/evolution-chain/${id}`)
  }
}
