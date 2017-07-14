import { AuthService } from './../auth/auth.service';
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
                private recipeService: RecipeService,
                private authService: AuthService){}

    storeRecipes(){
        const header = new Headers({'Content-Type': 'application/json'});
        const token = this.authService.getToken();
        return this.http.put('https://recipebook-f9c72.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes(), header);
    }

    // we get the recipes if we have a token
    getStoredRecipes(){
        const token = this.authService.getToken();
        
        this.http.get('https://recipebook-f9c72.firebaseio.com/recipes.json?auth=' + token)
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