import * as firebase from 'firebase';

export class AuthService {
    signupUser(email: string, password: string){
        // this is a promise 
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(
            error => console.log(error)
        )
    }
}