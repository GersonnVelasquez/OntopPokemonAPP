import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Pokemon } from 'src/app/shared/pokemon-data-access/models/pokemon.interface'

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionComponent {
  @Input() pokemon: Pokemon
}
