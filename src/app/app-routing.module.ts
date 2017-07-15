import { HomeComponent } from './core/home/home.component';
import { AuthGuard } from './auth/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' }, //laizy loading a module 
    { path: 'shopping-list', component: ShoppingListComponent }
]

@NgModule({
    // preloading strategy is going to load all your module, after the required module are loaded and the app is ready with your default loading strategy. It's kind of loading your required module, and after that, load ca loadChildren modules
    imports: [ RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})], 
    exports: [ RouterModule ]
})

export class AppRoutingModule {}