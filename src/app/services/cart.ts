import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList: any[] = [];
  public productList = new BehaviorSubject<any[]>([]); 

  constructor() { }

  getCart(): Observable<any[]> {
    return this.productList.asObservable();
  }

  addToCart(product: any) {
    const existingProduct = this.cartItemList.find(item => 
      (item.id && item.id === product.id) || 
      (item.title && item.title === product.title)
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      const productToAdd = { ...product, quantity: 1 };
      this.cartItemList.push(productToAdd);
    }
    this.productList.next(this.cartItemList);
  }

  updateQuantity(id: any, quantity: number) {
    const item = this.cartItemList.find(p => p.id === id || p.title === id);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(item.id || item.title);
      }
    }
    this.productList.next(this.cartItemList);
  }

  removeFromCart(id: any) {
    this.cartItemList = this.cartItemList.filter(item => item.id !== id && item.title !== id);
    this.productList.next(this.cartItemList);
  }

  clearCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}