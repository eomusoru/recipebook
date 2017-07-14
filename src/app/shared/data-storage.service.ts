import { Resolve } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';

// because we inject Http service into DataStorageService
@Injectable()

export class DataStorageService {
    constructor(private http: Http, 
                private recipeService: RecipeService){}

    storeRecipes(){
        const header = new Headers({'Content-Type': 'application/json'});
        return this.http.put('https://recipebook-f9c72.firebaseio.com/recipes.json', this.recipeService.getRecipes(), header);
    }

    getStoredRecipes(){
        this.http.get('https://recipebook-f9c72.firebaseio.com/recipes.json')
        .map(
            (response: Response) => {
                const recipes: Recipe[] = response.json();
                
                // if not ingredients added in the db, fake it
                for(let recipe of recipes){
                    if(!recipe['ingredients']){
                        recipe['ingredients'] = [];
                    }
                }
            return recipes;
            }
        )
        .subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
        )
    }
}