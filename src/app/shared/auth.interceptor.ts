import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private store: Store<fromApp.AppState>){ }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    // let the request continue
    console.log('Intercepted!', req);

    return this.store.select('auth')
      .take(1)
    // return an observable which doesn't wrap it into a new observable, but use the returned value which is already an obs
      .switchMap((authState: fromAuth.State) => {
        const copiedRed = req.clone({params: req.params.set('auth', authState.token)});
        return next.handle(copiedRed);
      })
  }
}
