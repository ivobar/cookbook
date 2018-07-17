import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {Recipe} from '../../recipe/recipe.model';
import {AuthService} from '../../auth/auth.service';
import {RecipeService} from '../../recipe/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  saveSubscription: Subscription;
  fetchSubscription: Subscription;

  constructor(private recService: RecipeService,
              private authService: AuthService) {
  }

  onSaveData() {
    this.saveSubscription = this.recService.saveRecipes()
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  onFetchData() {
    this.fetchSubscription = this.recService.fetchRecipes()
      .subscribe(
        (recipes: Recipe[]) => {
          this.recService.addRecipes(recipes);
          console.log(recipes);
        },
        (error) => console.log(error)
      );
  }

  onLogout() {
    this.authService.logoutUser();
  }

  ngOnDestroy() {
    this.saveSubscription.unsubscribe();
  }

  isLogged(): boolean {
    return this.authService.isAuthenticated();
  }
}
