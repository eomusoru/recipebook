import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{shoppingListState: Ingredient[]}>;

  constructor(private shoppingListService: ShoppingListService, private store: Store<{shoppingList: {shoppingListState: Ingredient[]}}>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList'); // select is returning an observable that contains a slice of the store shoppingList
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index); // emit the new values of the index using startedEditing subscription from ShoppingListService
  }
}
