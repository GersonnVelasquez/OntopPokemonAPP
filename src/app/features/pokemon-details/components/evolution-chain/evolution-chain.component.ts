import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Pokemon } from 'src/app/shared/pokemon-data-access/models/pokemon.interface'

@Component({
  selector: 'app-evolution-chain',
  templateUrl: './evolution-chain.component.html',
  styleUrls: ['./evolution-chain.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvolutionChainComponent {
  @Input() pokemon: Pokemon
}
