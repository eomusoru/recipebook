import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import construct = Reflect.construct;
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private authService: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    // let the request continue
    console.log('Intercepted!', req);

    const copiedRed = req.clone({params: req.params.set('auth', this.authService.getToken())});

    return next.handle(copiedRed);
  }
}
