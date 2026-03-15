import { Component, OnInit, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit, DoCheck {
  public totalItem: number = 0;
  public isLoggedIn: boolean = false;

  constructor(private cart: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cart.productList.subscribe(res => {
      this.totalItem = res.length;
    });
  }

  ngDoCheck(): void {
    const user = localStorage.getItem('user') || localStorage.getItem('token');
    this.isLoggedIn = !!user;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}