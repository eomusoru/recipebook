import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm; // get the reference of the form from the html dom

  subscription: Subscription; // subscription is a change listener for Subject
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
      .subscribe(
        data => {
          if(data.editedIngredientIndex > -1){
            this.editedItem = data.editedIngredient;
            this.editMode = true;

            // set the new edited element
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            });
          } else {
            this.editMode = false;
          }
        }
      );
  }

  onSubmit(form: NgForm){
    const newIngredient = new Ingredient(form.value.name, form.value.amount);

    if(this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}))
    } else {
      // place where action of the store should be done / dispatched
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }

    // reset the form and disable the editMode
    this.onClear();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
