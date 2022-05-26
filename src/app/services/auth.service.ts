import { Injectable } from '@angular/core';
import * as firebaseAuth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$!: Observable<firebaseAuth.User | any>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

  login() {
    this.afAuth.signInWithRedirect(new firebaseAuth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  get User() {
    return this.user$;
  }
}
