import { AuthService } from './../auth/auth.service';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';

// because we inject Http service into DataStorageService
@Injectable()

export class DataStorageService {
    constructor(private httpClient: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService){}

    storeRecipes(){
        const token = this.authService.getToken();
        const params = new HttpParams().set('auth', token);

        const req = new HttpRequest('PUT', 'https://recipebook-f9c72.firebaseio.com/recipes.json', this. recipeService.getRecipes(), {
          reportProgress: true,
          params: params
        });

        return this.httpClient.request(req);

        // return this.httpClient.put('https://recipebook-f9c72.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
        //   observe: 'body',
        //   params: params
        // });


    }

    // we get the recipes if we have a token
    getStoredRecipes(){
        const token = this.authService.getToken();
        const params = new HttpParams().set('auth', token);

        this.httpClient.get<Recipe[]>('https://recipebook-f9c72.firebaseio.com/recipes.json', {
          observe: 'body',
          responseType: 'json',
          params: params
        })
        .map(
            (recipes) => {
                // if not ingredients added in the db, fake it
                for (const recipe of recipes){
                    if (!recipe['ingredients']){
                        recipe['ingredients'] = [];
                    }
                }
            return recipes;
            }
        )
        .subscribe(
            (recipes) => {
                this.recipeService.setRecipes(recipes);
            }
        )
    }
}
