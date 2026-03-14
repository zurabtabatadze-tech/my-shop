import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private baseUrl = 'https://api.everrest.educata.dev/shop/products';

  constructor(private http: HttpClient) { }

  // 12-ის მაგივრად ვითხოვთ 50 პროდუქტს ერთდროულად
  getAllProducts(categoryId: string = '', page: number = 1) {
    const url = categoryId 
      ? `${this.baseUrl}/category/${categoryId}?pageIndex=${page}&pageSize=50`
      : `${this.baseUrl}/all?pageIndex=${page}&pageSize=50`;
    return this.http.get(url);
  }

  getProductById(id: string) {
    return this.http.get(`${this.baseUrl}/id/${id}`);
  }

  getCategories() {
    return this.http.get('https://api.everrest.educata.dev/shop/categories');
  }

  registerUser(userData: any) {
    return this.http.post('https://api.everrest.educata.dev/auth/sign_up', userData);
  }

  loginUser(credentials: any) {
    return this.http.post('https://api.everrest.educata.dev/auth/sign_in', credentials);
  }

  getProfile() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('https://api.everrest.educata.dev/auth/me', { headers });
  }
}