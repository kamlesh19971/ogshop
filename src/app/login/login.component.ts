import { Component, OnInit } from '@angular/core';
import * as firebaseAuth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth) {

  }

  ngOnInit(): void {
  }

  login() {
    this.afAuth.signInWithRedirect(new firebaseAuth.GoogleAuthProvider());
  }

}
