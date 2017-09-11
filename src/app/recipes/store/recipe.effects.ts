import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { HttpClient, HttpRequest } from "@angular/common/http";
import { Recipe } from "../recipe.model";

import * as fromRecipe from '../../recipes/store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';
import { Store } from "@ngrx/store";

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>('https://recipebook-f9c72.firebaseio.com/recipes.json', {
        observe: 'body',
        responseType: 'json',
      })
    })
    .map(
      (recipes) => {
        // if not ingredients added in the db, fake it
        for (const recipe of recipes){
          if (!recipe['ingredients']){
            recipe['ingredients'] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
    );

  @Effect({dispatch: false})
  recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .withLatestFrom(this.store.select('recipes')) // combine the value from ofType and the value from the passed Observable
    .switchMap(([action, state]) => {
      const req = new HttpRequest('PUT', 'https://recipebook-f9c72.firebaseio.com/recipes.json', state.recipes, { reportProgress: true});

      return this.httpClient.request(req);
    });

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromRecipe.FeatureState>) {}
}
