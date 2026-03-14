import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  @Input() product: any;

  constructor(private cartService: CartService) {}

  // ეს ფუნქცია გამოიძახება ღილაკზე დაჭერისას
  addToCart() {
    this.cartService.addToCart(this.product);
  }
}