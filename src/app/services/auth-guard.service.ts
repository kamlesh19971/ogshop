import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import * as firebaseAuth from 'firebase/auth';
import { AuthService } from './auth.service';

class Permissions {
  canActivate(user: Observable<any>, router: Router): boolean {
    if (user) return true;
    router.navigate(['/login']);
    return false;
  }
}


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private permission: Permissions) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const user = this.auth.User;
    return this.permission.canActivate(user, this.router)

    // this.auth.user$.subscribe(user => {
    //   if (user) return true;

    //   this.router.navigate(['/login']);
    //   return false;
    // });

  }
}
