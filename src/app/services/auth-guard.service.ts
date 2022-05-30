import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import * as firebaseAuth from 'firebase/auth';
import { AuthService } from './auth.service';

export class AuthPermissions {
  canActivate(user: Observable<any>, router: Router, url: string): boolean {

    if (user != null) return true;


    router.navigate(['/login'], { queryParams: { returnUrl: url } });
    // router.navigateByUrl(`/login?returnUrl=${url}`);
    return false;
  }
}


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private permission: AuthPermissions) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const user = this.auth.user;
    // console.log(state.url);

    return this.permission.canActivate(user, this.router, state.url);


    // this.auth.user$.subscribe(user => {
    //   if (user) return true;

    //   this.router.navigate(['/login']);
    //   return false;
    // });

  }
}
