import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<fromApp.State>) { }

  ngOnInit() {
  }

  onSignin(form: NgForm){
    const username = form.value.email;
    const password = form.value.password;

    this.store.dispatch(new AuthActions.TrySignin({username, password}));
  }
}
