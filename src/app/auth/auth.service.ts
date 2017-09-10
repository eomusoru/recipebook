import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthService {
    token: string;

    constructor( private router: Router,
                 private store: Store<fromApp.AppState>){}

    signupUser(email: string, password: string){
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
            user => {
                this.store.dispatch(new AuthActions.SignUp());
                firebase.auth().currentUser.getIdToken()
                    .then(
                        (token: string) =>{
                            this.store.dispatch(new AuthActions.SetToken(token));
                        }
                    )
            }
        )
        .catch(
            error => console.log(error)
        )
    }

    signinUser(email: string, password: string){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            response => {
                this.store.dispatch(new AuthActions.SignIn());
                this.router.navigate(['/']); // redirect the user
                firebase.auth().currentUser.getIdToken()
                    .then(
                        (token: string) =>{
                          this.store.dispatch(new AuthActions.SetToken(token));
                        }
                    )
            }
        )
        .catch(
            error => console.log(error)
        )
    }

    getToken(){
        //this method might return us a token expired and already stored in this.token by signinUser.
        firebase.auth().currentUser.getIdToken()
        .then(
            (token: string) => this.token = token
        )

        return this.token
    }

    isAuthenticated(){
        return this.token != null;
    }

    logout(){
        firebase.auth().signOut();
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigate(['/']);
    }
}
