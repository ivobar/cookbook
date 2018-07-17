import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientSelected = new Subject<any>();

  private ingredients: Ingredient[] = [
    new Ingredient('Garlic', 1),
    new Ingredient('Parsley', 4)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  editIngredient(index: number, editedIng: Ingredient) {
    this.ingredients[index].name = editedIng.name;
    this.ingredients[index].amount = editedIng.amount;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients = this.ingredients.filter((e, i) => i !== index);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
