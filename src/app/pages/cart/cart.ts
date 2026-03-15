import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price.current * item.quantity), 0);
  }

  removeItem(id: string) {
    this.cartService.removeFromCart(id);
  }

  increaseQuantity(item: any) {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
    }
  }

  checkout() {
    if (this.cartItems.length > 0) {
      alert('🎉 გილოცავთ! თქვენი შენაძენი წარმატებით დასრულდა. მადლობა რომ ირჩევთ MyShop-ს!');
      this.cartService.clearCart(); 
      this.router.navigate(['/']); 
    }
  }
}