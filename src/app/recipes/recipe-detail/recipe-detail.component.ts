import { AuthService } from './../../auth/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { Recipe } from '../recipe.model' ;
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor( private recipeService: RecipeService,
               private route: ActivatedRoute, 
               private router: Router,
               private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  addToShoppingList(){
    this.recipeService.addIngredients(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}