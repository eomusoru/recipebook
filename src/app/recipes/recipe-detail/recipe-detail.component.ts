import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model' ;
import { RecipeService } from '../recipe.service';
import { Observable } from "rxjs/Observable";

import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import "rxjs/add/operator/switchMap";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  authState: Observable<fromAuth.State>;
  recipe: Recipe;
  id: number;

  constructor( private recipeService: RecipeService,
               private route: ActivatedRoute,
               private router: Router,
               private store: Store<fromApp.AppState> ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );

    this.authState = this.store.select('auth');
  }

  addToShoppingList(){
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe(){
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
