import { Component, OnInit } from '@angular/core';
import * as firebaseAuth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  user$!: Observable<firebaseAuth.User | any>;
  // user!: firebaseAuth.User | any;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
    // afAuth.authState.subscribe(user => this.user = user);
  }


  logout() {
    this.afAuth.signOut();
  }

}
