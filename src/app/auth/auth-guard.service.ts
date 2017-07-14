import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Routes } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
    
    constructor(private authService: AuthService,
                private router: Router){}

    // if guard is true allow the page, else redirect it on the recipes page
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(this.authService.isAuthenticated()){
            return true;
        } else {
            this.router.navigate(['/recipes']);
        }
    }
    
    canLoad(route: Routes){
        return this.authService.isAuthenticated();
    }
}
