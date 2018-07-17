import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {NotFoundComponent} from './core/not-found/not-found.component';
import {HomeComponent} from './core/home/home.component';


const appRoutes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'recipes', loadChildren: './recipe/recipes.module#RecipesModule'},
  {path: 'shopping', component: ShoppingListComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
