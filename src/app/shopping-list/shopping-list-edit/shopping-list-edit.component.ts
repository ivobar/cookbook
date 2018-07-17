import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  selectionSub: Subscription;
  index: number;
  editMode = false;


  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.selectionSub = this.shoppingListService.ingredientSelected.subscribe(
      (data) => {
        this.form.setValue({
          'ingredientName': data.ingredient.name,
          'amount': data.ingredient.amount
        });
        this.index = data.index;
        this.editMode = true;
      }
    );
  }

  onSubmit() {
    const newIngredient = new Ingredient(this.form.value.ingredientName, this.form.value.amount);
    if (!this.editMode) {
      this.shoppingListService.addIngredient(newIngredient);
    } else {
      this.shoppingListService.editIngredient(this.index, newIngredient);
      this.editMode = false;
    }
    this.form.reset();
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.index);
    this.form.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.selectionSub.unsubscribe();
  }

}
