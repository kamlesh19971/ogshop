import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ShoppingCartService } from '../services/shopping-cart.service';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  cart!: any;
  shoppingCartItemCount!: number;

  constructor(public auth: AuthService, private shoppingCartService: ShoppingCartService) {

  }

  async loadCartIcount() {
    this.cart = await this.shoppingCartService.getCart();
  }

  ngOnInit() {
    this.loadCartIcount();
  }

  logout() {
    this.auth.logout();
  }

}
