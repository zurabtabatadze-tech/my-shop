import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { ProductDetails } from './pages/product-details/product-details';
import { Cart } from './pages/cart/cart';
import { Signup } from './pages/signup/signup';
import { Login } from './pages/login/login';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
  { path: '', component: Home }, 
  { path: 'product/:id', component: ProductDetails }, 
  { path: 'cart', component: Cart }, 
  { path: 'signup', component: Signup }, 
  { path: 'login', component: Login }, 
  { path: 'profile', component: Profile },
  
  { path: '**', redirectTo: '' } 
];