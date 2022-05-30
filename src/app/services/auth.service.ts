import { Injectable } from '@angular/core';
import * as firebaseAuth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$!: Observable<firebaseAuth.User | any>;
  user: firebaseAuth.User | any;

  constructor(private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = afAuth.authState;

    afAuth.authState.subscribe(user => {
      this.user = user;
    })
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithRedirect(new firebaseAuth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  // get appUser$(): Observable<AppUser> {
  //   return this.user.pipe(
  //     switchMap((user) => this.userService.get(user$.uid)),
  //   );
  // }
}
