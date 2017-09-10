import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

// REDUCER
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

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex]; // old ingredient
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = updatedIngredient;

      return{
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      }

    case ShoppingListActions.DELETE_INGREDIENT:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editedIngredientIndex, 1);

      return{
        ...state,
        ingredients: oldIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      }

    case ShoppingListActions.START_EDIT:
      const editedIngredient = {...state.ingredients[action.payload]};

      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: action.payload
      }

    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      }

    default:
      return state;
  }
}
