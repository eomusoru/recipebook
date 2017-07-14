import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model'; 
import { Ingredient } from '../shared/ingredient.model'; 
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable() 
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Grilled Asparagus and Shiitake Tacos',
            'Heat grill on medium. In a large baking dish, combine oil, garlic, chipotle, and salt. Add asparagus, shiitakes, and green onions; toss to coat. Grill asparagus until tender and lightly charred, turning occasionally; 5 to 6 minutes. Grill shiitakes and green onions until lightly charred, turning occasionally; 4 to 5 minutes. Transfer vegetables to cutting board.', 
            'http://ghk.h-cdn.co/assets/16/17/980x490/landscape-1461703583-ghk-0516-grilled-asparagus-and-shiitake-tacos.jpg',
            [
                new Ingredient ('Garlic cloves, crushed with press', 4),
                new Ingredient ('Bunch green onions, trimmed', 1),
                new Ingredient ('Corn tortillas, warmed', 4),
                new Ingredient ('Lime wedges, warmed', 1)
            ]),
        new Recipe(
            'Portobello & Peach Burger', 
            'Clean the portobello mushrooms by carefully removing dirt from the caps with a kitchen towel or cloth; you can use a little water if needed. Pat dry. Cut the peaches in halves and remove the pits.', 
            'https://beemapp2.s3.amazonaws.com/ce079b3a-2cda-4e8c-8184-97599be99c55.jpg',
            [
                new Ingredient('Portobello mushrooms', 6),
                new Ingredient('Peaches', 6),
                new Ingredient('Sweet potatoe', 6),
                new Ingredient('Burger buns of your choice', 4),
                new Ingredient('Fresh pea sprouts', 100)
            ])
      ];

    constructor (private shopListServ: ShoppingListService){}

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }   

    getRecipe(id: number){
        return this.recipes[id];
    }   

    addIngredients(ingredients: Ingredient[]){
        this.shopListServ.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);

        // set an observer of type Subject and inform that a new Recipe was added, and provide a new fresh .slice copy of the recipe FormArray
        // same for updateRecipe method
        this.recipesChanged.next(this.recipes.slice()); 
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(id: number){
        this.recipes.splice(id, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}