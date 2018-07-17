import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeComponent} from './recipe.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {BlankRecipeComponent} from './blank-recipe/blank-recipe.component';
import {AuthGuard} from '../auth/auth-guard.service';

const recipesRoutes: Routes = [
  {
    path: '', component: RecipeComponent, children: [
      {path: '', component: BlankRecipeComponent},
      {path: 'new', canActivate: [AuthGuard], component: RecipeEditComponent},
      {path: ':id/details', canActivate: [AuthGuard], component: RecipeDetailComponent},
      {path: ':id/edit', canActivate: [AuthGuard], component: RecipeEditComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class RecipesRoutingModule {
}
