import { DataStorageService } from './../../shared/data-storage.service';
import { AuthService } from './../../auth/auth.service';
import { Component } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

    constructor(private dataStorageSv: DataStorageService,
                private authService: AuthService){}

    onSave(){
      this.dataStorageSv.storeRecipes().subscribe(
        (response) => {
          // sent is event sent
          console.log(response);
        }
      );
    }

    onFetch(){
      this.dataStorageSv.getStoredRecipes();
    }

    onLogout(){
      this.authService.logout();
    }

    isAuthenticated(){
      return this.authService.isAuthenticated();
    }
}
