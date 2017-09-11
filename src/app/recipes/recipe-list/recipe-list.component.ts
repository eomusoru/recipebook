import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromRecipe from '../store/recipe.reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  auth: Observable<fromAuth.State>;
  recipeState: Observable<fromRecipe.State>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>,
              private storeR: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.recipeState = this.storeR.select('recipes');

    this.auth = this.store.select('auth');
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
