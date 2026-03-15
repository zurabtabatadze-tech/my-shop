import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {
  @Input() product: any;

  constructor(private cart: CartService) {}

  addToCart(item: any, event: Event) {
    event.stopPropagation();
    event.preventDefault(); 
    
    this.cart.addToCart(item);
    alert('✅ პროდუქტი წარმატებით დაემატა კალათაში!');
  }
}