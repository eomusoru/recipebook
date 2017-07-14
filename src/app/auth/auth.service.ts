import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()

export class AuthService {
    token: string;

    constructor( private router: Router){}

    signupUser(email: string, password: string){
        // this is a promise 
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(
            error => console.log(error)
        )
    }

    signinUser(email: string, password: string){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            response => {
                this.router.navigate(['/']); // redirect the user

                firebase.auth().currentUser.getIdToken()
                .then(
                    (token: string) => this.token = token
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
        this.token = null;
        this.router.navigate(['/']);
    }
}