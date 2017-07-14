import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../auth/auth-guard.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';

const recipesRoutes: Routes = [
    { path: '', component: RecipesComponent, children: [    // by default this path would be `recipes`, but since we load it laizly, we keep it empty, and all from now on, will be relative to `recipes`
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
        { path: ':id', component: RecipeDetailComponent },
        { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] },
    ]}
]

@NgModule({
    imports: [ RouterModule.forChild(recipesRoutes) ],
    exports: [ RouterModule ]
})

export class RecipesRoutingModule {

}