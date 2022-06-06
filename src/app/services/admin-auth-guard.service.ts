import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import * as firebaseAuth from 'firebase/auth';
import { AppUser } from '../models/app-user';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';

export class AdminPermissions {
  canActivate(user: any): boolean {
    if (user != null && user.isAdmin) return true;

    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService, private permission: AdminPermissions) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    return this.auth.user$.pipe(
      switchMap(user => this.userService.get(user.uid)),
      map((appUser) => {
        return appUser.isAdmin
      })
    );
  }
}
