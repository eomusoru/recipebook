import { DataStorageService } from './../../shared/data-storage.service';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';


@Component({
  selector: 'app-header', templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private dataStorageSv: DataStorageService,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSave() {
    this.dataStorageSv.storeRecipes().subscribe((response) => {
      // sent is event sent
      console.log(response);
    });
  }

  onFetch() {
    this.dataStorageSv.getStoredRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
}
