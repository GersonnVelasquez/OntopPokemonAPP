import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'pokemons',
    loadChildren: () =>
      import('./features/pokemon-list/pokemon-list.module').then(
        (m) => m.PokemonListModule,
      ),
  },
  {
    path: 'pokemon/:id',
    loadChildren: () =>
      import('./features/pokemon-details/pokemon-details.module').then(
        (m) => m.PokemonDetailsModule,
      ),
  },
  {
    path: '',
    redirectTo: 'pokemons',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'pokemons',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
