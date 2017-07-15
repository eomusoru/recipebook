import { DataStorageService } from './../../shared/data-storage.service';
import { AuthService } from './../../auth/auth.service';
import { Response } from '@angular/http';
import { Component, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

    constructor(private dataStorageSv: DataStorageService,
                private authService: AuthService){}
    
    onSave(){
      this.dataStorageSv.storeRecipes().subscribe(
        (response: Response) => {
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
