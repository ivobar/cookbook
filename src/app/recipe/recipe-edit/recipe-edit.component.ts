import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  form: FormGroup;
  id: number;
  editMode: boolean;
  recipe: Recipe;
  controls: any;

  constructor(private route: ActivatedRoute,
              private reService: RecipeService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = !!params['id'];
        this.formInitializer();
        this.controls = this.form.get('recipe.ingredients')['controls'];
      }
    );
  }

  private formInitializer(): void {
    if (this.editMode) {
      this.recipe = this.reService.getRecipe(this.id);
    }
    const nameState = !this.editMode ? null : this.recipe['name'];
    const descrState = !this.editMode ? null : this.recipe['description'];
    const imgState = !this.editMode ? null : this.recipe['imagePath'];
    const ingredients = new FormArray([]);
    if (this.editMode) {
      if (this.recipe['ingredients']) {
        for (const ingredient of this.recipe.ingredients) {
          ingredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          );
        }
      }
    }

    this.form = new FormGroup({
      'recipe': new FormGroup({
        'name': new FormControl(nameState, Validators.required),
        'description': new FormControl(descrState, Validators.required),
        'imagePath': new FormControl(imgState, Validators.required),
        'ingredients': ingredients
      }),
      'newIngredient': new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, Validators.required)
      })
    });
  }

  onSubmit(): void {
    const newRecipe = this.form.get('recipe').value;

    if (this.editMode) {
      this.reService.editRecipe(this.id, newRecipe);
      this.onCancel();
    } else {
      this.reService.addRecipe(newRecipe);
      this.onCancel();
    }
  }

  onCancel(): void {
    const navRoute = this.editMode ? ['../details'] : ['../'];
    this.editMode = false;
    this.router.navigate(navRoute, {relativeTo: this.route});
  }

  onAddIngredient(): void {
    const newIngredient = this.form.get('newIngredient').value;
    (<FormArray>this.form.get('recipe.ingredients')).push(
      new FormGroup({
        'name': new FormControl(newIngredient.name),
        'amount': new FormControl(newIngredient.amount)
      })
    );
    this.form.get('newIngredient').reset();
  }

  onRemoveIngredient(index: number): void {
    (<FormArray>this.form.get('recipe.ingredients')).removeAt(index);
  }

}
