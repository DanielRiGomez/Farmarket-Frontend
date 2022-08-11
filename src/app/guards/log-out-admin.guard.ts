import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogOutAdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('token');
    if(!token ){
      this.router.navigateByUrl('')
    }else {
      const type = localStorage.getItem('typeUser');
      if(!type){
        if(type == "U"){
          this.router.navigateByUrl('')
        }
      }

    }

    return true;
  }

}
