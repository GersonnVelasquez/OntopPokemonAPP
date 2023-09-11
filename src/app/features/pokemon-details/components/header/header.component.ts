import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Pokemon } from 'src/app/shared/pokemon-data-access/models/pokemon.interface'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() pokemon: Pokemon
}
