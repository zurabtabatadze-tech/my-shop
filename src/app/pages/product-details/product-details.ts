import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetails implements OnInit {
  product: any = null;
  activeTab: string = 'details';
  showToast: boolean = false;
  relatedProducts: any[] = [];

  constructor(
    private route: ActivatedRoute, 
    private api: Api,
    private cart: CartService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadProduct(id);
      }
    });
  }

  loadProduct(id: string) {
    this.product = null;
    this.api.getProductById(id).subscribe({
      next: (res: any) => {
        this.product = res;
        this.loadRelatedProducts();
      },
      error: (err) => console.error('ერორი:', err)
    });
  }

  loadRelatedProducts() {
    const currentCat = this.product.category?.name || this.product.category?.title || this.product.category;
    const currentId = this.product.id || this.product._id;

    if(this.api.getAllProducts) {
      this.api.getAllProducts().subscribe((res: any) => {
        const all = res.products || res; 
        
        this.relatedProducts = all.filter((p: any) => {
          const pCat = p.category?.name || p.category?.title || p.category;
          const pId = p.id || p._id;
          return pCat === currentCat && pId !== currentId;
        }).slice(0, 4); 
      });
    }
  }

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  addToCart(product: any) {
    this.cart.addToCart(product);
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}