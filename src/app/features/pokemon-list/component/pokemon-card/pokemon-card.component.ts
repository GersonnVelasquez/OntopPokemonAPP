import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Pokemon } from 'src/app/shared/pokemon-data-access/models/pokemon.interface'

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  @Input() pokemon: Pokemon
  @Output() pokemonSelected = new EventEmitter<number>()

  onPokemonSelected(): void {
    this.pokemonSelected.emit(this.pokemon.id)
  }
}
