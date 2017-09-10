import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';
import { async } from "rxjs/scheduler/async";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private store: Store<fromApp.AppState>) {}

  // if guard is true allow the page, else redirect it on the recipes page
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth')
      .take(1)
      .map((authState: fromAuth.State) => {
      return authState.authenticated;
    });
  }
}

