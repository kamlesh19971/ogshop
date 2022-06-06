import { Injectable } from '@angular/core';
import * as firebaseAuth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, switchMap, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$!: Observable<firebaseAuth.User | any>;
  user: firebaseAuth.User | any;
  userData: AppUser | any;

  constructor(private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = afAuth.authState;

    afAuth.authState.subscribe(user => {
      this.user = user;
      if (user && user.uid) {
        localStorage.setItem('uid', user.uid);
        this.userService.get(user!.uid).then(res => {
          localStorage.setItem('user', JSON.stringify(res));
          this.userData = res;
        })
      }

    })
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithRedirect(new firebaseAuth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
    localStorage.removeItem('user');
  }


  get appUser$(): any {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.email) {
      return user;
    } else {
      return false;
    }
  }
}