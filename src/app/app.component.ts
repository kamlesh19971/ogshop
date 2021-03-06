import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    auth.user$.subscribe(user => {

      if (!user) return;

      userService.save(user);

      let returnUrl: string = localStorage.getItem('returnUrl') || '';

      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);

    })
  }
}
