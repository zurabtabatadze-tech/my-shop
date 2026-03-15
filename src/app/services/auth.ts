import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('access_token'));

  isLoggedIn$ = this.loggedIn.asObservable();
  login(token: string) {
    localStorage.setItem('access_token', token);
    this.loggedIn.next(true);
  }
  logout() {
    localStorage.removeItem('access_token');
    this.loggedIn.next(false);
  }
}