import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
}

// set the default initial state
export function ShoppingListReducers(state = initialState, action: ShoppingListActions.ShoppingListActions){
  switch (action.type){
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        // ...we return the old state spread by ... operator, and we overwrite the ingredients with the same ones as in the state before, with one extra
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return{
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      }

    default:
      return state;
  }
}
