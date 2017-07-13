import { Response } from '@angular/http';
import { Component, EventEmitter } from '@angular/core';

import { DataStorageService } from './../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

    constructor(private dataStorageSv: DataStorageService){}
    
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
}
