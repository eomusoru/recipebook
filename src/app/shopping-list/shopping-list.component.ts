import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients = [];
  newIngredient: Ingredient; 
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();

    // When a new ingredient is added, we catch the EventEmitter that inform us about this change,
    // and we just refresh the array, which is actually a copy of the original array an the not original itself
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index); // emit the new values of the index using startedEditing subscription from ShoppingListService
    
  }
}
