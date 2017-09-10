import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode =  false;
  recipeForm: FormGroup;

  constructor( private route: ActivatedRoute,
               private recipeService: RecipeService,
               private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;

        this.initForm();
      }
    );
  }

  onSubmit(){
    // either updated or brand new, in both cases we need a new Recipe item
    // Since newRecipe will have the exactly same fields, we pass as edit / add recipe argument
    // the form value like this: this.recipeForm.value
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );

    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    console.log(this.recipeForm.value);

    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['recipes']);
    this.editMode = false;
  }

 // dyanmic handle new ingredients
  onAddIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onDeleteIngredient(index: number){
    // removeAt removes the controller at position specified
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  getIngredientsControls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    // if the user is in edit mode, we just past the editing values to the Reactive Form fields
    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);

      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      // check if the loaded recipe contains have ingredients
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            // we are going to group each ingredient into a FormGroup
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name':      new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
