import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { ProductCard } from '../../components/product-card/product-card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCard, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: any[] = [];
  brands: string[] = [];

  selectedCategory: string = '';
  searchQuery: string = '';
  maxPrice: number = 5000;
  selectedBrand: string = '';
  minRating: number = 0;

  currentPage: number = 1;
  hasMoreProducts: boolean = true;

  constructor(private api: Api, private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadCategories();
    
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchQuery = params['search'];
      } else {
        this.searchQuery = '';
      }
      
      if (this.products.length === 0) {
        this.loadProducts();
      } else {
        this.applyFilters();
      }
    });
  }

  loadProducts(catId: string = '') {
    this.api.getAllProducts(catId, this.currentPage).subscribe((res: any) => {
      this.products = res.products;
      // აქაც შევცვალეთ: თუ 50 პროდუქტი მოვიდა, ესეიგი შემდეგი გვერდიც არსებობს
      this.hasMoreProducts = this.products.length === 50; 
      this.brands = [...new Set(this.products.map(p => p.brand).filter(b => b))];
      this.applyFilters();
    });
  }

  loadCategories() {
    this.api.getCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }

  selectCategory(id: string) {
    this.selectedCategory = id;
    this.selectedBrand = '';
    this.currentPage = 1;
    this.loadProducts(id);
  }

  resetFilters() {
    this.searchQuery = '';
    this.maxPrice = 5000;
    this.selectedBrand = '';
    this.minRating = 0;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesPrice = p.price.current <= this.maxPrice;
      const matchesBrand = this.selectedBrand === '' || p.brand === this.selectedBrand;
      const matchesRating = p.rating >= this.minRating;
      
      return matchesSearch && matchesPrice && matchesBrand && matchesRating;
    });
  }

  nextPage() {
    if (this.hasMoreProducts) {
      this.currentPage++;
      this.loadProducts(this.selectedCategory);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts(this.selectedCategory);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}