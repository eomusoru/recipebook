import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';

// because we inject Http service into DataStorageService
@Injectable()

export class DataStorageService {
    constructor(private httpClient: HttpClient,
                private recipeService: RecipeService){}

    storeRecipes(){
        const req = new HttpRequest('PUT', 'https://recipebook-f9c72.firebaseio.com/recipes.json', this. recipeService.getRecipes(), { reportProgress: true});

        return this.httpClient.request(req);
    }

    // we get the recipes if we have a token
    getStoredRecipes(){
        this.httpClient.get<Recipe[]>('https://recipebook-f9c72.firebaseio.com/recipes.json', {
          observe: 'body',
          responseType: 'json',
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
