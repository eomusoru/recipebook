import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingListState: Observable<{shoppingListState: Ingredient[]}>;
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService, private store: Store<{shoppingList: {shoppingListState: Ingredient[]}}>) { }

  ngOnInit() {
    // select is returning an observable that contains a slice of the store shoppingList
    this.shoppingListState = this.store.select('shoppingList');

    // // When a new ingredient is added, we catch the EventEmitter that inform us about this change,
    // // and we just refresh the array, which is actually a copy of the original array an the not original itself
    // this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
    //   (shoppingListState: Ingredient[]) => {
    //     this.shoppingListState = shoppingListState;
    //   }
    // );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index); // emit the new values of the index using startedEditing subscription from ShoppingListService

  }
}
