// Effects are a ngrx store property for when we need to do another thing, after executing a ngrx action. Basically it's the extra for the ngrx actions.
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from "@angular/core";

import * as AuthActions from './auth.actions';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import "rxjs/add/operator/mergeMap";
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable() // inject our current actions
export class AuthEffects {
  @Effect()

  authSignup = this.actions$
    // in oftype we check if the action is a specific type
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
      // convert the following like from a firebase promite to an observable, because we are going to need such an observable later
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    }).switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    }).mergeMap((token: string) => {
      return [
        {
          type: AuthActions.SIGNUP
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ]
    });

  constructor(private actions$: Actions) {

  }
}
