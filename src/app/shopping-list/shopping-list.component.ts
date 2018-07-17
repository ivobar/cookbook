import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {ShoppingListService} from './shopping-list.service';
import {Ingredient} from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy() {
    this.ingChangeSub.unsubscribe();
  }

  selectIng(ingredient: Ingredient, index: number) {
    this.shoppingListService.ingredientSelected.next({ingredient, index});
  }
}
