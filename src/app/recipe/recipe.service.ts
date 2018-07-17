import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {AuthService} from '../auth/auth.service';

import {map} from 'rxjs/operators';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Таратор',
      'Very tasty Bulgarian cold soup',
      'http://kulinar.bg/pictures/21997_398__5.jpg',
      [
        new Ingredient('Кисело мляко', 1),
        new Ingredient('Краставица', 1),
        new Ingredient('Връзка копър', 1)
      ]),
    new Recipe('Качамак',
      'Много вкусно, особено с пръжки',
      'http://www.gotvachnicata.com/images/recipes/big/1396200203.jpg',
      [
        new Ingredient('Царевично брашно', 1),
        new Ingredient('Масло', 1),
        new Ingredient('Пръжки', 20)
      ]),
    new Recipe('Юфка',
      'Перфектно с масълце',
      'http://gradcontent.com/lib/600x350/yufka.jpg',
      [
        new Ingredient('Пакет юфка', 1),
        new Ingredient('Масло', 1),
        new Ingredient('Сирене', 1)
      ])
  ];
  recipesChanged = new Subject();

  constructor(private slService: ShoppingListService,
              private httpClient: HttpClient,
              private authService: AuthService) {
  }

  getRecipe(id: number): Recipe {
    if (this.recipes[id]) {
      return this.recipes[id];
    }
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  sendIngrToSl(ingredients: Ingredient[]): void {
    this.slService.addIngredients(ingredients);
  }

  editRecipe(id: number, recipe: Recipe): void {
    const recipeToEdit = this.recipes[id];
    if (recipeToEdit && recipe) {
      recipeToEdit.name = recipe.name;
      recipeToEdit.description = recipe.description;
      recipeToEdit.imagePath = recipe.imagePath;
      recipeToEdit.ingredients = recipe.ingredients.slice();
    }
    this.recipesChanged.next();
  }

  addRecipe(recipe: Recipe): void {
    if (recipe) {
      const newRecipe = new Recipe(recipe.name, recipe.description, recipe.imagePath, recipe.ingredients.slice());
      this.recipes.push(newRecipe);
      this.recipesChanged.next();
    }
  }

  addRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next();
  }

  deleteRecipe(id: number): void {
    if (this.recipes[id]) {
      this.recipes.splice(id, 1);
      this.recipesChanged.next();
    }
  }

  saveRecipes() {
    return this.httpClient.put('https://cookbook-e21a4.firebaseio.com/recipes.json?auth=' + this.authService.token, this.recipes);
  }

  fetchRecipes() {
    return this.httpClient.get<Recipe[]>('https://cookbook-e21a4.firebaseio.com/recipes.json?auth=' + this.authService.token)
      .pipe(
        map(
          (recipes: Recipe[]) => {
            for (const recipe of recipes) {
              if (!recipe['ingredients']) {
                recipe.ingredients = [];
              }
            }
            return recipes;
          }
        )
      );
  }
}
