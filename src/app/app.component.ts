import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit() {
    // we need to pass the values from web setup of firebase
    firebase.initializeApp({
      apiKey: 'AIzaSyBcRf9S96l9xRqn27CsjKszeFKe4PxfG0k',
      authDomain: 'recipebook-f9c72.firebaseapp.com',
    });
  }
}
