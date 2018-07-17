import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';

import {RecipeService} from '../recipe/recipe.service';
import {AuthService} from '../auth/auth.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

import {AppRoutingModule} from '../app-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    CommonModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    AuthService
  ]
})
export class CoreModule {
}
