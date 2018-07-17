import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipeToDisplay: Recipe;
  recipeUpdateSub: Subscription;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeToDisplay = this.recipeService.getRecipe(+params['id']);
      }
    );
    this.recipeUpdateSub = this.recipeService.recipesChanged.subscribe(
      () => {
        this.recipeToDisplay = this.recipeService.getRecipe(+this.route.snapshot.params['id']);
      }
    );
  }

  ngOnDestroy() {
    this.recipeUpdateSub.unsubscribe();
  }

  addToShoppingList() {
    this.recipeService.sendIngrToSl(this.recipeToDisplay.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(+this.route.snapshot.params['id']);
    this.router.navigate(['/recipes']);
  }

}
