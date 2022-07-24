import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    sessionStorage.setItem('token', '21f12f1.1rgg13rgf.1rg2r3g');
    const token = sessionStorage.getItem('token');
    let req = request;
    if(token){
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
