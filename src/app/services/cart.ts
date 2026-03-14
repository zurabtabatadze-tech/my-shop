import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<any[]>(this.loadCart());

  getCart() { return this.cart.asObservable(); }

  addToCart(product: any) {
    const currentCart = this.cart.value;
    const item = currentCart.find(i => i.id === product.id);
    if (item) {
      item.quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }
    this.updateCart(currentCart);
  }

  removeFromCart(productId: string) {
    const currentCart = this.cart.value.filter(i => i.id !== productId);
    this.updateCart(currentCart);
  }

  updateQuantity(productId: string, quantity: number) {
    const currentCart = this.cart.value;
    const item = currentCart.find(i => i.id === productId);
    if (item) {
      item.quantity = quantity;
      this.updateCart(currentCart);
    }
  }

  // ახალი: კალათის სრულად გასუფთავება
  clearCart() {
    this.updateCart([]);
  }

  private updateCart(cart: any[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cart.next(cart);
  }

  private loadCart(): any[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
}