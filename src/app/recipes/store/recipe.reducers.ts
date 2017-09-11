import * as RecipeActions from '../store/recipe.actions';
import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import * as fromApp from '../../store/app.reducers';

// this interface is a similar one as the app.reducer.ts and we do this because it's an interface only for our feature app and it's not for the entire app
// basically this FeatureState would contain the entire app state, with this extension inside it
export interface FeatureState extends fromApp.AppState{
  recipes: State
}

export interface State{
  recipes: Recipe[]
}

const initialState: State = {
  recipes: [
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
    ]
}

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions){
  switch (action.type){
    case RecipeActions.SET_RECIPES:
      return{
        ...state,
        recipes: [...action.payload]
      };

    case RecipeActions.ADD_RECIPE:
      return{
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case RecipeActions.UPDATE_RECIPE:
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: recipes
      };

    case RecipeActions.DELETE_RECIPE:
      const oldRecipes = [...state.recipes];
      const deletedRecipes = oldRecipes.splice(action.payload, 1)

      return{
        ...state,
        recipes: deletedRecipes
      };

    default:
       return state;
  }
}
