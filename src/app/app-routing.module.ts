import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'wordle-game',
    loadChildren: () => import('./ui/views/wordle-game/wordle-game.routing.module').then(m => m.WordleGameRoutingModule)
  },
  {
    path: '**',
    redirectTo: 'wordle-game'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
