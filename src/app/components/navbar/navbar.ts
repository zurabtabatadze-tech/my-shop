import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // დაემატა Router
import { CartService } from '../../services/cart';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // დაემატა ველის წასაკითხად

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule], // დაემატა FormsModule
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  cartCount: number = 0;
  isLoggedIn: boolean = false;
  userData: any = null; 
  searchQuery: string = ''; // საძიებო სიტყვა

  constructor(
    private cartService: CartService, 
    private authService: AuthService,
    private router: Router // დაემატა გადასამისამართებლად
  ) {}

  ngOnInit() {
    this.cartService.getCart().subscribe(items => {
      this.cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    });

    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      if (status) {
        const token = localStorage.getItem('access_token');
        if (token) {
          try {
            let payload = token.split('.')[1];
            payload = payload.replace(/-/g, '+').replace(/_/g, '/');
            const decoded = JSON.parse(atob(payload));
            this.userData = decoded;
          } catch (e) {
            this.userData = null;
          }
        }
      } else {
        this.userData = null;
      }
    });
  }

  // ძებნის ფუნქცია
  onSearch() {
    if (this.searchQuery.trim()) {
      // გადავდივართ მთავარ გვერდზე და ლინკში ვატანთ საძიებო სიტყვას
      this.router.navigate(['/'], { queryParams: { search: this.searchQuery.trim() } });
    } else {
      this.router.navigate(['/']);
    }
  }

  onLogout() {
    this.authService.logout();
    this.userData = null;
  }
}