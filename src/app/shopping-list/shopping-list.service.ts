import { Ingredient } from './../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
import { EventEmitter } from '@angular/core';

export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>(); // Set a flag which will inform us about the fact that the ingredients array is changed. 
    startedEditing = new Subject<number>(); // Set a watcher to detect when we want to edit one ingredient (click on it)

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index: number){
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice()); // push the new ingredient
    }

    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    } 
}